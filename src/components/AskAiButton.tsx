'use client'

import { User } from "@supabase/supabase-js"

type Props = {
    user:User | null
}

function AskAiButton({user}:Props) {
    console.log("AskAiButton", user)
  return (
    <div>AskAiButton</div>
  )
}

export default AskAiButton