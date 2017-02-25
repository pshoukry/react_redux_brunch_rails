import React from 'react'
import { IndexRoute, Route, Link, IndexRedirect, Redirect  } from 'react-router'


import App from './components/App'
import Home from './components/Home'
import Tickets from './components/Tickets'
import Users from './components/Users'
import TicketForm from './components/TicketForm'
import TicketDetails from './components/TicketDetails'

const routes = (
    <Route path='/' component={App}>
      <IndexRoute component={Tickets} />
      <Route path='/tickets' component={Tickets}>
        <Route path='/tickets/:id' component={TicketDetails}> </Route>
      </Route>
      <Route path='/new_ticket' component={TicketForm}> </Route>
      <Route path='/users' component={Users}> </Route>
    </Route>
)

export default routes
