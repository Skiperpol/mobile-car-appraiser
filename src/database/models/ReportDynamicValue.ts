import { Model, Relation } from '@nozbe/watermelondb'
import { date, field, readonly, relation, text } from '@nozbe/watermelondb/decorators'

import Report from './Report'
import type ReportFieldConfig from './ReportFieldConfig'

export default class ReportDynamicValue extends Model {
  static table = 'report_dynamic_values'

  static associations = {
    reports: { type: 'belongs_to', key: 'report_id' },
    report_fields_config: { type: 'belongs_to', key: 'field_id' },
  } as const

  @field('report_id') reportId!: string
  @relation('reports', 'report_id') report!: Relation<Report>

  @field('field_id') fieldId!: string
  @relation('report_fields_config', 'field_id') field!: Relation<ReportFieldConfig>

  @text('value') value!: string

  @readonly @date('created_at') createdAt!: Date
  @readonly @date('updated_at') updatedAt!: Date
}

