import { Model, Relation } from '@nozbe/watermelondb'
import { date, field, readonly, relation, text } from '@nozbe/watermelondb/decorators'

import Report from './Report'

export default class BasicData extends Model {
  static table = 'basic_data'

  static associations = {
    reports: { type: 'belongs_to', key: 'report_id' },
  } as const

  @field('report_id') reportId!: string
  @relation('reports', 'report_id') report!: Relation<Report>

  @text('brand') brand!: string | null
  @text('model') model!: string | null
  @text('vin') vin!: string | null
  @text('registration_number') registrationNumber!: string | null
  @field('production_year') productionYear!: number | null

  @readonly @date('created_at') createdAt!: Date
  @readonly @date('updated_at') updatedAt!: Date
}

