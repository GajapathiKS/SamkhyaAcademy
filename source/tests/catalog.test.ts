import { describe, expect, it } from 'vitest'
import { courseCatalog, brochureCourses, retiredCourseSlugs } from '@samkhya/catalog'

describe('authoritative course catalog', () => {
  it('contains three free foundations and eight brochure programs', () => {
    expect(courseCatalog.filter((course) => course.pricingCategory === 'FREE')).toHaveLength(3)
    expect(brochureCourses).toHaveLength(8)
  })

  it('uses only authoritative commercial and content enum labels', () => {
    expect(courseCatalog.some((course) => String(course.pricingCategory) === 'PRICED')).toBe(false)
    expect(courseCatalog.some((course) => String(course.contentType) === 'HYBRID_OFFLINE_ONLINE_VIDEOS')).toBe(false)
  })

  it('retires standalone SAP consulting while preserving SAP as an FDE integration topic', () => {
    expect(retiredCourseSlugs.has('sap-enterprise-consulting')).toBe(true)
    expect(courseCatalog.some((course) => course.slug === 'sap-enterprise-consulting')).toBe(false)
    const fde = courseCatalog.find((course) => course.slug === 'ai-engineering')
    expect(fde?.modules.some((module) => module.lessons.some((lesson) => lesson.includes('SAP')))).toBe(true)
  })

  it('provides meaningful curriculum depth for every active course', () => {
    for (const course of courseCatalog) {
      expect(course.modules.length).toBeGreaterThanOrEqual(4)
      expect(course.modules.flatMap((module) => module.lessons).length).toBeGreaterThanOrEqual(16)
      expect(course.outcomes.length).toBeGreaterThanOrEqual(4)
    }
  })
})
