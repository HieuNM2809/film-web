import { Grid, Icon, MenuItem, Select } from '@mui/material';
import { makeStyles, styled } from '@mui/styles';
import React from 'react';

const StyledSelect = styled(Select)`
  background: #ffffff;
  min-width: 240px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.07);
  border-radius: ${(props) => (props.around ? '9999px' : '6px')};
  border: 1px solid transparent !important;
  .MuiSelect-select {
    &:focus {
      background: white !important;
    }
  }
  .MuiSelect-root {
    padding: ${(props) =>
    props.small ? '10px 25px 8px 10px' : '17.6px 30px 17.6px 14px'};
  }
  &.MuiInput-underline {
    &::after {
      display: none !important;
    }
    &::before {
      display: none !important;
    }
  }
  .MuiGrid-item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
`;
const useStyles = makeStyles({
  select: {
    '& ul': {
      maxWidth: 'fit-content'
    },
    '& li': {
      whiteSpace: 'normal'
    }
  }
});
function CommonSelect(props) {
  const classes = useStyles();
  return (
    <StyledSelect
      variant='outlined'
      MenuProps={{
        classes: { paper: props.isFit ? classes.select : '' },
        style: props.menuStyle,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left'
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'left'
        },
        getContentAnchorEl: null
      }}
      {...props}
    >
      {props.items
        ? props.items.map((item) => {
          return props.withIcon ? (
            <MenuItem
              key={item.value}
              value={item.value}
              disabled={item.value === 'none' ? true : false}
            >
              <Grid container spacing={1}>
                <Grid item className={'center'}>
                  <Icon>{item.icon}</Icon>
                </Grid>
                <Grid item className={'center'}>
                  {item.label}
                </Grid>
              </Grid>
            </MenuItem>
          ) : (
            <MenuItem
              key={item.value}
              value={item.value}
              disabled={item.value === 'none' ? true : false}
            >
              {item.label}
            </MenuItem>
          );
        })
        : null}
    </StyledSelect>
  );
}

export default CommonSelect;
