import { Link } from 'react-router-dom';

function Dashboard() {
    return (
        <div>
            <h1>Employee Portal Dashboard</h1>
            <nav>
                <ul>
                    <li><Link to="/attendance">Mark Attendance</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default Dashboard;
