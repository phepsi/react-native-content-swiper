
const colors = {
  transparent: 'transparent',
  black: '#000',
  white: '#fff',
}

export const theme = {
  contentSlider: {
    root: {
      flex: 1,
    },
  },
  contentView: {
    container: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      backgroundColor: colors.black,
    },
    content: {
      position: 'relative',
      width: '100%',
      height: '100%',
    }
  },
  contentItem: {
    container: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  contentModal: {
    container: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  },
  contentOverlay: {
    container: {
      backgroundColor: colors.transparent,
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      margin: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      zIndex: 10,
    },
    bottomContainer: {
      flexDirection: 'row',
    }
  },
  indicator: {
    container: {
      backgroundColor: colors.white,
      width: 6,
      height: 6,
      borderRadius: 3,
      margin: 5,
    }
  },
}
