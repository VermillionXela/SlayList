import './App.css'
import { Route, Routes } from 'react-router-dom'
import {SlayerRegisterView} from './views/SlayerRegisterView'
import { GuildRegisterView } from './views/GuildRegisterView'
import {SlayerLoginView} from './views/SlayerLoginView'
import {GuildLoginView} from './views/GuildLoginView'
import {GuildDashboardView} from './views/GuildDashboardView'
import {NewHuntView} from './views/NewHuntView'
import {EditHuntView} from './views/EditHuntView'
import {HomeView} from './views/HomeView'
import {SlayerDashboardView} from './views/SlayerDashboardView'
import {SlayerHuntsView} from './views/SlayerHuntsView'
import { PrivateRoute } from './components/PrivateRoute'
import { GuildContainer, SlayerContainer } from './components/Containers'


function App() {


  return (
      <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/slayer/register" element={<SlayerRegisterView />} />
      <Route path="/slayer/login" element={<SlayerLoginView />} />
      <Route path="/guild/register" element={<GuildRegisterView />} />
      <Route path="/guild/login" element={<GuildLoginView />} />

      <Route element={<PrivateRoute role="guild" />}>
        <Route element={<GuildContainer />}>
          <Route path="/guild/dashboard" element={<GuildDashboardView />} />
          <Route path="/guild/hunts/:id/edit" element={<EditHuntView />} />
          <Route path="/guild/hunts/new" element={<NewHuntView />} />
        </Route>
      </Route>

      <Route element={<PrivateRoute role="slayer" />}>
        <Route element={<SlayerContainer />}>
          <Route path="/slayer/dashboard" element={<SlayerDashboardView />} />
          <Route path="/slayer/hunts" element={<SlayerHuntsView />} />
        </Route>
      </Route>
      </Routes>
  )
}


export default App
