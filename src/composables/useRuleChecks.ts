import { useUserInfoStore } from '@/stores/useUserInfo'
import { computed } from 'vue'
import teamMemberList from '~/_data/teamMemberList.json'
import feedbackMemberList from '~/_data/feedbackMemberList.json'
import blogMemberList from '~/_data/blogMemberList.json'

const rolesPermissions = {
  teamMember: ['edit_feedback', 'manage_feedback', 'write_blog', 'manage_blog'],
  feedbackMember: ['manage_feedback', 'edit_feedback'],
  blogMember: ['write_blog', 'manage_feedback'],
  author: ['edit_feedback'],
} as const

const userRolesMap = {
  teamMember: new Set(teamMemberList),
  feedbackMember: new Set(feedbackMemberList),
  blogMember: new Set(blogMemberList),
} as const

type Role = keyof typeof rolesPermissions
type Permission = (typeof rolesPermissions)[Role][number]

export const useRuleChecks = (inputId?: string | number) => {
  const userInfo = useUserInfoStore()
  const id = computed(() => (inputId ?? userInfo.info?.id) || 0)

  const staticRoles = computed(() => {
    return (
      Object.keys(userRolesMap) as Array<keyof typeof userRolesMap>
    ).filter((role) => userRolesMap[role].has(Number(id.value)))
  })

  const userRoles = computed((): Array<Role> => {
    return id.value === String(userInfo.info?.id)
      ? [...staticRoles.value, 'author']
      : staticRoles.value
  })

  const userPermissions = computed(() => {
    return userRoles.value.reduce<string[]>((perms, role) => {
      return perms.concat(rolesPermissions[role] || [])
    }, [])
  })

  const hasAnyPermissions = (...permissions: Permission[]) =>
    computed(() =>
      permissions.some((permission) =>
        userPermissions.value.includes(permission),
      ),
    )

  const hasAllPermissions = (...permissions: Permission[]) =>
    computed(() =>
      permissions.every((permission) =>
        userPermissions.value.includes(permission),
      ),
    )

  const hasAnyRoles = (...roles: Role[]) =>
    computed(() => roles.some((role) => userRoles.value.includes(role)))

  const hasAllRoles = (...roles: Role[]) =>
    computed(() => roles.every((role) => userRoles.value.includes(role)))

  return {
    hasAnyPermissions,
    hasAllPermissions,
    hasAnyRoles,
    hasAllRoles,
  }
}
