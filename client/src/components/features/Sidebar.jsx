import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LabelIcon from '@material-ui/icons/Label';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex'
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0
		}
	},
	// appBar: {
	// marginLeft: drawerWidth,
	// [theme.breakpoints.up('sm')]: {
	// 	width: `calc(100% - ${drawerWidth}px)`
	// }
	// },
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
		backgroundColor: '#050404',
		color: '#efefef'
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	},
	listIcons: {
		color: 'rgba(246, 241, 241, 0.54)'
	}
}));

export default function ResponsiveDrawer(props) {
	const { container } = props;
	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = React.useState(false);

	function handleDrawerToggle() {
		setMobileOpen(!mobileOpen);
	}

	const drawer = (
		<div>
			<div className={classes.toolbar} />
			<Divider />
			<List>
				{['New Bucketlist', 'My Bucketlist'].map((text, index) => (
					<ListItem button key={text}>
						<ListItemIcon className={classes.listIcons}>
							{index % 2 === 0 ? <AddIcon /> : <LabelIcon />}
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				{['All Bucketlist', 'Trash'].map((text, index) => (
					<ListItem button key={text}>
						<ListItemIcon className={classes.listIcons}>
							{index % 2 === 0 ? <BookmarkIcon /> : <DeleteIcon />}
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
		</div>
	);

	return (
		<div className={classes.root} style={{ bakcgroundColor: '#050404' }}>
			<CssBaseline />
			<nav className={classes.drawer} aria-label="Mailbox folders">
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Hidden smUp implementation="css">
					<Drawer
						container={container}
						variant="temporary"
						anchor={theme.direction === 'rtl' ? 'right' : 'left'}
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper
						}}
						ModalProps={{
							keepMounted: true // Better open performance on mobile.
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden xsDown implementation="css">
					<Drawer
						classes={{
							paper: classes.drawerPaper
						}}
						variant="permanent"
						open
					>
						{drawer}
					</Drawer>
				</Hidden>
			</nav>
		</div>
	);
}

ResponsiveDrawer.propTypes = {
	container: PropTypes.object
};
