import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import { Platform } from 'react-native'

import BasicData from './models/BasicData'
import Report from './models/Report'
import ReportDynamicValue from './models/ReportDynamicValue'
import ReportFieldConfig from './models/ReportFieldConfig'
import schema from './schema'

const adapter = new SQLiteAdapter({
  schema,
  jsi: Platform.OS === 'ios', 
  onSetUpError: (error) => {
    console.error('Błąd inicjalizacji bazy WatermelonDB:', error)
  },
})

export const database = new Database({
  adapter,
  modelClasses: [Report, BasicData, ReportFieldConfig, ReportDynamicValue],
})