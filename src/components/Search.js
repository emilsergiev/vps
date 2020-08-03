import React, { useState } from 'react'
import Downshift from 'downshift'
import deburr from 'lodash/deburr'
import { SEARCH_URL } from 'assets/constants'
import avatarFallbackImage from 'assets/anon.png'
import { Link } from 'react-router-dom'
import { fade, makeStyles } from '@material-ui/core/styles'
import { AccountSearchOutline } from 'mdi-material-ui'
import {
  Avatar, Typography, InputBase, Paper, MenuItem, ListItemIcon
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  container: {
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: -50,
    right: -50,
    [theme.breakpoints.up('sm')]: {
      left: 0,
      right: 0,
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 6),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 200,
      '&:focus': {
        width: 300,
      },
    },
  },
}))

const renderInput = (inputProps) => {
  const { classes, ...other } = inputProps

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <AccountSearchOutline />
      </div>
      <InputBase
        placeholder='Search Users...'
        classes={{ root: classes.inputRoot, input: classes.inputInput }}
        {...other}
      />
    </div>
  )
}

const renderSuggestion = (suggestionProps) => {
  const { suggestion, index, itemProps, highlightedIndex, selectedItem } = suggestionProps
  const isHighlighted = highlightedIndex === index
  const isSelected = (selectedItem || '').indexOf(suggestion.fullyQualifiedName) > -1

  let profileImage = suggestion.profile.image

  if (profileImage === undefined || profileImage === null) {
    profileImage = avatarFallbackImage
  } else {
    profileImage = suggestion.profile.image[0].contentUrl
  }

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.fullyQualifiedName}
      selected={isHighlighted}
      component={Link} to={suggestion.fullyQualifiedName}
      style={{ fontWeight: isSelected ? 500 : 400 }}
    >
      <ListItemIcon>
        <Avatar alt='avatar' src={ profileImage } />
      </ListItemIcon>
      <Typography variant='caption' noWrap>
        {suggestion.profile.name}<br />{suggestion.fullyQualifiedName}
      </Typography>
    </MenuItem>
  )
}

const Search = (props) => {
  const classes = useStyles()
  const [users, setUsers] = useState([])
  const [searchWord, setSearchWord] = useState('')

  const fetchUsers = async (input) => {
    if (input.length > 1) {
      await fetch(SEARCH_URL + input).then(results => results.json())
        .then(data => {
          setUsers(data.results)
          setSearchWord(input)
        })
    }
  }

  const getSuggestions = (value, { showEmpty = false } = {}) => {
    const inputValue = deburr(value.trim()).toLowerCase()
    const inputLength = inputValue.length
    let count = 0

    if (inputValue !== searchWord && inputLength !== 0) {
        fetchUsers(inputValue)
    }

    let suggestions = users

    return inputLength === 0 && !showEmpty ? [] : suggestions.filter(suggestion => {
      const keep = count < 7 &&
        suggestion.fullyQualifiedName.slice(0, inputLength)
        .toLowerCase() === inputValue
      if (keep) { count += 1 }
      return keep
    })
  }

  return (
    <Downshift
      onChange={() => {document.activeElement.blur()}}
      itemToString={item => ''}>
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        highlightedIndex,
        inputValue,
        isOpen,
        selectedItem,
      }) => {
        const { onBlur, onFocus, ...inputProps } = getInputProps()

        return (
          <div className={classes.container}>
            { renderInput({classes, inputProps}) }
            <div {...getMenuProps()}>
              { isOpen ?
                (
                  <Paper className={classes.paper} square>
                    { getSuggestions(inputValue).map((suggestion, index) =>
                      renderSuggestion({
                        suggestion,
                        index,
                        itemProps: getItemProps({ item: suggestion.fullyQualifiedName }),
                        highlightedIndex,
                        selectedItem,
                      }),
                    )}
                  </Paper>
                ) : null
              }
            </div>
          </div>
        )
      }}
    </Downshift>
  )
}

export default Search
