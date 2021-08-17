import { getPpaTransactionCmpTime, PpaTransaction } from './ppaTransaction'
import { rule } from 'postcss'

interface PpaTransactionList {
  title: string
  key: string
  itemList: PpaTransaction[]
  filter: (element: PpaTransaction) => boolean
  sort: (a: PpaTransaction, b: PpaTransaction) => number
}

const commonSort = (a: PpaTransaction, b: PpaTransaction) => {
  const cmpA = getPpaTransactionCmpTime(a)
  const cmpB = getPpaTransactionCmpTime(b)
  if (cmpA.isBefore(cmpB)) {
    return -1
  }
  if (cmpA.isAfter(cmpB)) {
    return 1
  }
  return a.title.localeCompare(b.title, 'zh-CN')
}

const transactionRules: PpaTransactionList[] = [
  {
    title: '未完成',
    key: 'unComplete',
    itemList: [],
    filter: element => {
      if (element.complete) {
        return false
      }
      if (element.category === 'remind' && !element.endTime) {
        return false
      }
      if (
        element.category === 'mission' &&
        element.volume &&
        !element.volume.total
      ) {
        return false
      }
      if (
        element.category === 'task' &&
        element.stats &&
        !element.stats.total
      ) {
        return false
      }
      return true
    },
    sort: commonSort
  },
  {
    title: '长期事件',
    key: 'forever',
    itemList: [],
    filter: element => {
      if (element.complete) {
        return false
      }
      if (element.category === 'remind' && !element.endTime) {
        return true
      }
      if (
        element.category === 'mission' &&
        element.volume &&
        !element.volume.total
      ) {
        return true
      }
      if (
        element.category === 'task' &&
        element.stats &&
        !element.stats.total
      ) {
        return true
      }
      return false
    },
    sort: commonSort
  },
  {
    title: '已完成',
    key: 'complete',
    itemList: [],
    filter: element => {
      return element.complete
    },
    sort: commonSort
  }
]
export function divideTransaction(
  items: PpaTransaction[]|undefined
): PpaTransactionList[] {
  if(!items){
    return transactionRules
  }
  return transactionRules.map(rule => {
    rule.itemList = items.filter(rule.filter)
    rule.itemList.sort(rule.sort)
    return rule
  })
}
