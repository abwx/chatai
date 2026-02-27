import Dexie, { type EntityTable } from 'dexie'
import { ProviderProps} from '../src/ts/type'
//ts写法
export const db = new Dexie('vChatDatabase') as Dexie & { 
  //固定写法
  //xxx: EntityTable<xxx的类型, 'id'> 
  providers: EntityTable<ProviderProps, 'id'> 

}