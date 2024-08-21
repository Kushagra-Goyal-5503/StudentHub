import React from 'react'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Todo from './components/Todo/Todo'; 
import Register from './components/Registration/Register';
import Login from './components/Login/Login';
import AddTask from './components/AddTask/AddTask';
import TaskList from './components/TaskList/TaskList';

function App() { 
const headStyle = { 
	textAlign: "center", 
} 
return ( 
	<div> 
        <BrowserRouter> 
            <Routes> 
                <Route path='/home' element={<Todo/>} />
                <Route path="/register" element={<Register />} /> 
                <Route path="/" element={<Login />} />
                <Route path="/AddTask" element={<AddTask />} />
                <Route path="/TaskList" element={<TaskList />} />
            </Routes> 
        </BrowserRouter> 
	</div> 
); 
} 

export default App;
