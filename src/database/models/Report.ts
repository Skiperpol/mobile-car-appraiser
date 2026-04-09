import { Model, Query } from '@nozbe/watermelondb'
import { children, date, readonly, text } from '@nozbe/watermelondb/decorators'

import type BasicData from './BasicData'
import ReportAttachments from './ReportAttachments'
import type ReportDynamicValue from './ReportDynamicValue'

export default class Report extends Model {
  static table = 'reports'

  static associations = {
    basic_data: { type: 'has_many', foreignKey: 'report_id' },
    report_dynamic_values: { type: 'has_many', foreignKey: 'report_id' },
    report_attachments: { type: 'has_many', foreignKey: 'report_id' },
  } as const

  @text('user_id') userId!: string
  @text('order_id') orderId!: string | null
  @text('report_number') reportNumber!: string

  @children('basic_data') basicData!: Query<BasicData>
  @children('report_dynamic_values') dynamicValues!: Query<ReportDynamicValue>
  @children('report_attachments') attachments!: Query<ReportAttachments>

  @readonly @date('created_at') createdAt!: Date
  @readonly @date('updated_at') updatedAt!: Date
}

