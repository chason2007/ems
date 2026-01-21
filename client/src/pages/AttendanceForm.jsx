import { useState } from 'react';
import axios from 'axios';

function AttendanceForm({ userId }) {
    const [status, setStatus] = useState('Present');

    const markAttendance = async () => {
        try {
            await axios.post('http://localhost:5000/api/attendance/mark', {
                userId,
                status
            });
            alert('Attendance Marked!');
        } catch (error) {
            console.error(error);
            alert('Failed to mark attendance');
        }
    };

    return (
        <div>
            <h3>Mark Attendance</h3>
            <select onChange={(e) => setStatus(e.target.value)}>
                <option value="Present">Present</option>
                <option value="Half-day">Half-Day</option>
                <option value="Absent">Absent</option>
            </select>
            <button onClick={markAttendance}>Submit</button>
        </div>
    );
}

export default AttendanceForm;