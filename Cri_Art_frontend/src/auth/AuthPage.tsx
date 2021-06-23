import { useRef } from "react"

function AuthPage() {
      const usernameRef = useRef<HTMLInputElement>(null)
      const passwordRef = useRef<HTMLInputElement>(null)

      function handleSubmit() {
            const username = usernameRef.current?.value
            const password = passwordRef.current?.value

            console.log(`Username: ${username}`)
            console.log(`Password: ${password}`)

            //Fetch to the API With these credentials

      }

      return (
            <div>
                 <input type="text" ref={usernameRef} placeholder='Username'/>
                 <input type="password" ref={passwordRef} placeholder='Password'/>
                 <button type="button" onClick={handleSubmit}>Login</button>
            </div>
      )
      
}

export default AuthPage