import React, { useState, useEffect } from 'react';
import ActionAreaCard from './projectCard';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Backdrop } from '@mui/material';
import CreateProjectForm from './createProjectForm';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../../redux/store/slices/projectSlice';
import  Dashboard  from "../Dashboard/dashboard"

const Home = () => {
    // const [loggedInUser, setLoggedInUser] = useState(null);
    // const [userProjects, setUserProjects] = useState([]);
    const [open, setOpen] = useState(false); //modal state
    const dispatch = useDispatch();
    const allProjects = useSelector(state=>state.projects.projects)
    console.log(allProjects);
    const cur_user = useSelector(state=>state.currentUser.currentUser);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const loggedInUserData = await fetchLoggedInUserData();

                // setLoggedInUser(loggedInUserData);
                // const projectsData = await fetchProjectsData();
                dispatch(getProjects())
                // setUserProjects(projectsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [dispatch]);

    // const fetchLoggedInUserData = async () => {
    //     return { email: 'peter@gmail.com', id: '1' };
    // };

    const fetchProjectsData = async () => {
        const res = await fetch("http://localhost:8000/projects");
        const projectsJson = await res.json();
        return projectsJson;
    };

    const filterOwnedProjects = (projects, user) => {
        if (!user) return [];
        return projects.filter((project) => 
            project.manager.email === user.email
        );
    };

    const filterGuestProjects = (projects,user)=>{
        if(!user) return [];
        return projects.filter((project)=>
            project.members.some(member => member.email === user.email)
        );
    }

    const ownedProjects = filterOwnedProjects(allProjects, cur_user);
    const guestProjects = filterGuestProjects(allProjects,cur_user)

    const handleCreateNewProject = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>


    {/* <div style={{height:"35%"}}> <Dashboard></Dashboard> </div>             */}
            <h3 style={{textAlign:"left",marginLeft:"2%"}}>Owned Projects</h3>
            <div style={{display:"flex",flexWrap:"wrap"}}>
                {ownedProjects.map(project => (
                    <ActionAreaCard projectTitle={project.title} key={project.id} id={project.id}/>
                ))}
            </div>
            <h3 style={{textAlign:"left",marginLeft:"2%"}}>Guest Projects</h3>
            <div style={{display:"flex",flexWrap:"wrap"}}>
                {guestProjects.map(project=>(
                    <ActionAreaCard projectTitle={project.title} key={project.id} id={project.id}/>
                ))}
            </div>
            <Button 
                onClick={handleCreateNewProject} 
                sx={{
                    color:"white", 
                    backgroundColor:"#1565c0",
                    position: 'fixed', 
                    bottom: '20px', 
                    right: '20px',
                    '&:hover': {
                        backgroundColor: "#0d47a1",
                    },
                }}
            >
                Create New Project
            </Button>
            
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogContent>
                    <CreateProjectForm/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
            <Backdrop 
                open={open} 
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            />
        </div>
    );
};

export default Home;
