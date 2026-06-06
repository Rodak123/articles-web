import type { ProjectLinkType } from '../types/webData';

const linkTypeNames: Record<ProjectLinkType, string> = {
  github: 'Github',
  itchio: 'Itch.io',
  npm: 'NPM',
  steam: 'Steam',
  unityAssetStore: 'Unity Asset Store',
};

export const stringifyLinkType = (linkType: ProjectLinkType) => {
  return linkTypeNames[linkType];
};
