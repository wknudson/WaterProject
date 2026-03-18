import { useState } from 'react';
import { useEffect } from 'react';
import type { Project } from './types/Project';
function ProjectList() {

    const [projects, setProjects] = useState<Project[]>([]);
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        // Simulate an API call to fetch projects
        const fetchProjects = async () => {
            // Replace this with your actual API call
            const response = await fetch(`https://localhost:5000/api/water/AllProjects?pageNumber=${pageNumber}&pageSize=${pageSize}`);
            const data = await response.json();
            setProjects(data.projects);
            setTotalItems(data.totalNumProjects);
            setTotalPages(Math.ceil(data.totalNumProjects / pageSize));
        };

        fetchProjects();
    }, [pageSize, pageNumber]); // Re-run the effect when pageSize or pageNumber changes

  return (
    <>
        <h1>Water Project List</h1>
        <br />
        {projects.map((project) => (
            <div id="projectCard" className="card" key={project.projectId}>
                <h3 className="card-title">{project.projectName}</h3>
                <div className="card-body">
                <ul className="list-unstyled">
                    <li>
                        <strong>Project Type:</strong> {project.projectType}
                    </li>
                    <li>
                        <strong>Regional Program:</strong> {project.projectRegionalProgram}
                    </li>
                    <li>
                        <strong>Impact:</strong> {project.projectImpact} Individuals Served
                    </li>
                    <li>
                        <strong>Project Phase:</strong> {project.projectPhase}
                    </li>
                    <li>
                        <strong>Project Status:</strong> {project.projectFunctionalityStatus}
                    </li>
                </ul>
                </div>
            </div>
        ))}

        <button onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber === 1}>
            Previous
        </button>
{totalPages > 0 && [...Array(totalPages)].map((_, index) => (
    <button key={index} onClick={() => setPageNumber(index + 1)} disabled={pageNumber === index + 1}>
        {index + 1}
    </button>
))}
        <button onClick={() => setPageNumber(pageNumber + 1)} disabled={pageNumber === totalPages}>
            Next
        </button>
        <br />
        <label>
            Results per page:
            <select value={pageSize} onChange={(e) => {
                setPageSize(Number(e.target.value))
                setPageNumber(1);
                }}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
            </select>
        </label>
    </>
  );
}

export default ProjectList;