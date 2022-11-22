import React from "react";
import CustomList from "../../CustomList";
import MatchCell from "../MatchCell";
import NoMatchRecordsFound from "../NoMatchRecordsFound";

const MatchesList = ({ currentUser, matches, onMatchesSelect }) => {
  return matches && matches.length > 0 ? (
    <CustomList
      data={matches}
      renderRow={(data) => {
        return (
          <MatchCell
            key={data.id}
            currentUser={currentUser}
            data={data}
            onMatchSelect={onMatchesSelect}
          />
        );
      }}
    />
  ) : (
    <NoMatchRecordsFound />
  );
};

export default MatchesList;
