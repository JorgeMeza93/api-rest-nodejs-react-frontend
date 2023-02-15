import React, { useState } from 'react'

const Context = React.createContext([ {}, () => {} ]);
const Provider = props => {
    const [auth, guardarAuth] = useState({
        token: "",
        auth: false
    })
    return (
        <Context.Provider value={[auth, guardarAuth]}>
            {props.children}
        </Context.Provider>
    )
}

export { Context, Provider }