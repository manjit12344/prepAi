import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { userAuth } from "../store/01.auth.store";
import { useHistory } from "../store/03.history";

const History = () => {
  const navigate = useNavigate();
  const { know, knowMe } = userAuth();
  const { myInterviews, interview, loading } = useHistory();

  useEffect(() => {
    const checkAuthAndFetchHistory = async () => {
      await knowMe();
    };
    checkAuthAndFetchHistory();
  }, []);

  useEffect(() => {
    if (know?.user) {
      myInterviews();
    }
  }, [know?.user, myInterviews]);

  if (!know?.user) {
    return (
      <div>
        Please log in to view this page.
      </div>
    );
  }

  return (
    <div>
      {/* Header Section */}
      <header>
        <h1>Interview History</h1>
        <p>Review and continue your previous mock interview sessions.</p>
        <div>
          <span>sessions: {interview?.length || 0}</span>
        </div>
      </header>

      {/* Sessions Stack Feed */}
      <main>
        {loading ? (
          <div>Loading sessions...</div>
        ) : interview && interview.length > 0 ? (
          <div>
            {interview.map((e) => (
              <div key={e.id} onClick={() => navigate(`/chatSession/${e.id}`)}>
                <div>
                  <span>Type: {e.type}</span>
                  <span>Level: {e.level}</span>
                  <p>Company: {e.company}</p>
                  <p>ID: #{e.id}</p>
                </div>

                <div>
                  <span>Status: {e.status?.toLowerCase() || "active"}</span>
                  <button type="button">View Session</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>No interview sessions recorded yet.</div>
        )}
      </main>

      {/* Footer */}
      <footer>
        <span>Handshake status: Secured</span>
        <span>prepAI © 2026</span>
      </footer>
    </div>
  );
};

export default History;