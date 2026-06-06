import { isProjectLinkType, type Project } from '../../libs/types/webData';
import { stringifyLinkType } from '../../libs/utils/stringifyLinkType';
import { IconLink } from './IconLink';
import { Typography } from './Typography';

interface ProjectDisplayProps {
  project: Project;
}

export const ProjectDisplay: React.FC<ProjectDisplayProps> = ({ project }) => {
  return (
    <div
      style={{
        backgroundImage: `url(/projects/${project.slug}/cover.png)`,
      }}
      className='min-w-80 w-80 h-full bg-accent-600 rounded flex flex-row bg-cover bg-center'
    >
      <div className='flex flex-col grow'>
        <Typography size='2xl' className='ps-2 py-2 bg-transparent-tint'>
          {project.title}
        </Typography>
      </div>
      <div className='w-16 flex flex-col gap-2 py-2 bg-transparent-tint'>
        {Object.keys(project.links)
          .splice(0, 4)
          .map((linkType: string) => {
            if (!isProjectLinkType(linkType)) return;
            const link = project.links[linkType];
            if (link === undefined) return;
            return (
              <IconLink
                key={linkType}
                title={`Open ${project.title} at ${stringifyLinkType(linkType)}`}
                href={link}
                type={linkType}
              />
            );
          })}
      </div>
    </div>
  );
};
