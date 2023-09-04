import Index from "../_components/transaction/transaction";
import { getClient } from '../_lib/client'
import { GET_USER_ARRAY } from "../graphql/getUser";






export default async function Transactions() {
  const { data } = await getClient().query({ query: GET_USER_ARRAY });
  

  return (
    <div>
      <Index  users={data?.Page?.users || []}/>
    </div>
  )
}