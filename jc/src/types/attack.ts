import type { ComposeOption } from 'echarts/core'
import type { PieSeriesOption } from 'echarts/charts'
import type { TitleComponentOption, TooltipComponentOption, LegendComponentOption } from 'echarts/components'
 import { ref } from 'vue'
// 组合Option类型 
export type EChartsOption = ComposeOption<
  | PieSeriesOption 
  | TitleComponentOption 
  | TooltipComponentOption 
  | LegendComponentOption 
>
 
// 攻击数据类型 
export interface AttackDataItem {
  name: string 
  value: number 
}
 
export interface AttackData {
  legendData: string[]
  seriesData: AttackDataItem[]
}

export const attackData = ref<AttackData>({
  legendData: ['smurf', 'neptune', 'normal', 'back', 'satan', 'ipsweep', 'portsweep', 'warezclient', 'teardrop', 'pod', 'nmap', 'guess_passwd', 'buffer_overflow', 'land', 'warezmaster', 'imap', 'rootkit', 'loadmodule', 'ftp_write', 'multihop', 'phf', 'spy', 'perl' ],
  seriesData: [
    { name: 'smurf', value: 280790 },
    { name: 'neptune', value: 107201 },
    { name: 'normal', value: 97277 },
    { name: 'back', value: 2203 },
    { name: 'satan', value: 1589 },
    { name: 'ipsweep', value: 1247 },
    { name: 'portsweep', value: 1040 },
    { name: 'warezclient', value: 1020 },
    { name: 'teardrop', value: 979 },
    { name: 'pod', value: 264 },
    { name: 'nmap', value: 231 },
    { name: 'guess_passwd', value: 53 },
    { name: 'buffer_overflow', value: 30 },
    { name: 'land', value: 21 },
    { name: 'warezmaster', value: 20 },
    { name: 'imap', value: 12 },
    { name: 'rootkit', value: 10 },
    { name: 'loadmodule', value: 9 },
    { name: 'ftp_write', value: 8 },
    { name: 'multihop', value: 7 },
    { name: 'phf', value: 4 },
    { name: 'spy', value: 2 },
    { name: 'perl', value: 3 } 
  ]
})