import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import whiteList from '../../../lib/whiteList.json'

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    })
  ],
  callbacks: {
    async signIn(user, account, profile) {
      if(user.name){
        if(whiteList.includes(user.name)){
          return true
        }
      }
      return false
    }
  }
})
