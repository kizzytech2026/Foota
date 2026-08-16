import { useContext } from "react";

import ThemeToggle from "../components/ThemeToggle";

import { TeamContext } from "../context/TeamContext";



const Settings = () => {

const {

teamName,

setTeamName,

resetData,

} = useContext(TeamContext);



const handleReset = () => {

const confirmed = window.confirm(

"Are you sure you want to reset all TeamHub data?"

);



if (confirmed) {

resetData();

}

};



return (

<div className="page-container">

<div className="page-header">

<div>

<p className="eyebrow">CONFIGURATION</p>



<h1>Settings</h1>



<p>

Manage your team's application preferences.

</p>

</div>

</div>



<div className="settings-container">

<section className="settings-section">

<div className="settings-heading">

<h2>Team Information</h2>

<p>

Update basic information about your team.

</p>

</div>



<div className="settings-form">

<div className="form-group">

<label htmlFor="teamName">

Team Name

</label>



<input

id="teamName"

type="text"

value={teamName}

onChange={(e) =>

setTeamName(e.target.value)

}

/>

</div>

</div>

</section>



<section className="settings-section">

<div className="settings-heading">

<h2>Appearance</h2>



<p>

Customize how TeamHub looks on your device.

</p>

</div>



<ThemeToggle />

</section>



<section className="settings-section danger-section">

<div className="settings-heading">

<h2>Data Management</h2>



<p>

Reset all locally stored TeamHub data.

</p>

</div>



<button

className="danger-btn"

onClick={handleReset}

>

Reset Application Data

</button>

</section>

</div>

</div>

);

};



export default Settings;