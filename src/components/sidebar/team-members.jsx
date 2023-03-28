import React from "react";
import {useGetTeamsQuery} from '../../features/teams/teamsApi'

const TeamMembers = () => {
  const {data: teams, isLoading, isError} = useGetTeamsQuery();
  //decide what to render
  let content = null;
  if (isLoading) {
    content = <h1>Loading...</h1>;
  }
  if (!isLoading && isError) {
    content = <h1>something went wrong!</h1>;
  }
  if (!isLoading && !isError && teams?.length === 0) {
    content = <h1>There is no teams member!</h1>;
  }
  if (!isLoading && !isError && teams?.length > 0) {
    content = (
      <div className="mt-3 space-y-4">
        {teams.map((team) => (
          <div key={team.id} className="checkbox-container">
            <img src={team.avatar} className="team-avater" />
            <p className="label">{team.name}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold">Team Members</h3>
      {content}
    </div>
  );
};

export default TeamMembers;
