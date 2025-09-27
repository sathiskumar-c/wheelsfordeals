import React from 'react';
import PropTypes from 'prop-types';
import { emphasize, styled } from '@mui/material/styles';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  return {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(3),
    color: (theme.vars || theme).palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(theme.palette.grey[100], 0.06),
      ...theme.applyStyles('dark', {
        backgroundColor: emphasize(theme.palette.grey[800], 0.06),
      }),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[100], 0.12),
      ...theme.applyStyles('dark', {
        backgroundColor: emphasize(theme.palette.grey[800], 0.12),
      }),
    },
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  };
});

const Breadcrumb = ({ breadcrumbData }) => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <div role="presentation">
      <MuiBreadcrumbs aria-label="breadcrumb">
        {breadcrumbData.map((item, index) => (
          <StyledBreadcrumb
            key={index}
            component="a"
            href={item.path || '#'}
            onClick={(e) => {
              e.preventDefault();
              handleClick(item.path);
            }}
            label={item.label}
            icon={item.isHome ? <HomeIcon fontSize="small" /> : null}
            deleteIcon={item.hasDropdown ? <ExpandMoreIcon /> : null}
            onDelete={item.hasDropdown ? () => {} : null}
          />
        ))}
      </MuiBreadcrumbs>
    </div>
  );
};

Breadcrumb.propTypes = {
  breadcrumbData: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string,
      isHome: PropTypes.bool,
      hasDropdown: PropTypes.bool
    })
  ).isRequired
};

export default Breadcrumb;