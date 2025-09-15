import { Fragment } from "react/jsx-runtime";
import type { Platform } from "../../services/types";
import GameLink from "../../ui/GameLink";
import InfoTag from "../../ui/InfoTag";

function Platforms({ platforms }: { platforms?: Platform[] }) {
  if (!platforms || platforms.length === 0) return null;

  const platformLinks = platforms.map((p, i) => (
    <Fragment key={p.id}>
      <GameLink to={`/games?platforms=${p.id}`} title={`Search for ${p.name} games`}>
        {p.name}
      </GameLink>
      {i !== platforms.length - 1 && " - "}
    </Fragment>
  ));

  return (
    <InfoTag>
      <span>Platforms:</span> {platformLinks}
    </InfoTag>
  );
}

export default Platforms;
