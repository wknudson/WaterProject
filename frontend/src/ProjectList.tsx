import { useState } from 'react';
import { useEffect } from 'react';
import type { Project } from './types/Project';
function ProjectList() {

    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        // Simulate an API call to fetch projects
        const fetchProjects = async () => {
            // Replace this with your actual API call
            const response = await fetch('https://localhost:5000/api/water/AllProjects');
            const data = await response.json();
            setProjects(data);
        };

        fetchProjects();
    }, []);

  return (
    <>
        <h1>Water Project List</h1>
        <br />
        {projects.map((project) => (
            <div id="projectCard">
                <h2>{project.projectName}</h2>
                <ul>
                    <li>
                        Type: {project.projectType}
                    </li>
                    <li>
                        Regional Program: {project.projectRegionalProgram}
                    </li>
                    <li>
                        Impact: {project.projectImpact} Individuals Served
                    </li>
                    <li>
                        Project Phase: {project.projectPhase}
                    </li>
                    <li>
                        Project Status: {project.projectFunctionalityStatus}
                    </li>
                </ul>
            </div>
        ))}

    </>
  );
}

export default ProjectList;