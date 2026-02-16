import { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Badge from "@mui/material/Badge";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { mockUser, mockQuoteRequests } from "../../lib/data";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Venues", href: "/venues" },
  { label: "Catering", href: "/catering" },
];

interface NavbarProps {
  isLoggedIn?: boolean;
}

const Navbar = ({ isLoggedIn = false }: NavbarProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const pendingCount = mockQuoteRequests.filter(
    (q) => q.status === "replied",
  ).length;

  const initials = mockUser.firstName.charAt(0) + mockUser.lastName.charAt(0);

  const userMenuItems = [
    {
      label: "Dashboard",
      icon: <DashboardIcon sx={{ fontSize: 20 }} />,
      href: "/dashboard",
    },
    {
      label: "My Quotes",
      icon: <ReceiptLongIcon sx={{ fontSize: 20 }} />,
      href: "/dashboard",
      badge: pendingCount,
    },
    {
      label: "Account Settings",
      icon: <SettingsIcon sx={{ fontSize: 20 }} />,
      href: "/dashboard",
    },
  ];

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: "rgba(253, 252, 251, 0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid",
          borderColor: "rgba(61, 47, 37, 0.08)",
          top: 0,
          zIndex: 1100,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 72 } }}>
            <RouterLink
              to="/"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <FavoriteIcon sx={{ color: "secondary.main", fontSize: 24 }} />
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 700,
                  color: "primary.main",
                  fontSize: { xs: "1.1rem", md: "1.25rem" },
                  letterSpacing: "-0.01em",
                }}
              >
                TooInfinity
              </Typography>
            </RouterLink>

            <Box sx={{ flexGrow: 1 }} />

            {!isMobile ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {navLinks.map((link) => (
                  <Button
                    key={link.href}
                    component={RouterLink}
                    to={link.href}
                    sx={{
                      color:
                        location.pathname === link.href
                          ? "secondary.main"
                          : "text.primary",
                      fontWeight: location.pathname === link.href ? 700 : 400,
                      fontSize: "0.95rem",
                      px: 2,
                      borderRadius: 2,
                      textTransform: "none",
                      position: "relative",
                      "&::after":
                        location.pathname === link.href
                          ? {
                              content: '""',
                              position: "absolute",
                              bottom: 6,
                              left: "50%",
                              transform: "translateX(-50%)",
                              width: 20,
                              height: 2,
                              backgroundColor: "secondary.main",
                              borderRadius: 1,
                            }
                          : {},
                      "&:hover": {
                        backgroundColor: "rgba(196, 114, 78, 0.06)",
                        color: "secondary.main",
                      },
                    }}
                  >
                    {link.label}
                  </Button>
                ))}

                {isLoggedIn ? (
                  <>
                    <IconButton
                      onClick={(e) => setAnchorEl(e.currentTarget)}
                      sx={{ ml: 1 }}
                      aria-label="Open account menu"
                      aria-controls={menuOpen ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={menuOpen ? "true" : undefined}
                    >
                      <Badge
                        badgeContent={pendingCount}
                        color="error"
                        overlap="circular"
                        sx={{
                          "& .MuiBadge-badge": {
                            fontSize: "0.65rem",
                            height: 18,
                            minWidth: 18,
                            bgcolor: "secondary.main",
                          },
                        }}
                      >
                        <Avatar
                          sx={{
                            width: 38,
                            height: 38,
                            bgcolor: "primary.main",
                            fontSize: "0.85rem",
                            fontWeight: 700,
                            border: "2px solid",
                            borderColor: "rgba(196,114,78,0.3)",
                          }}
                        >
                          {initials}
                        </Avatar>
                      </Badge>
                    </IconButton>

                    <Menu
                      id="account-menu"
                      anchorEl={anchorEl}
                      open={menuOpen}
                      onClose={() => setAnchorEl(null)}
                      onClick={() => setAnchorEl(null)}
                      transformOrigin={{ horizontal: "right", vertical: "top" }}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                      PaperProps={{
                        sx: {
                          mt: 1,
                          minWidth: 240,
                          borderRadius: 2.5,
                          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                          border: "1px solid",
                          borderColor: "rgba(61,47,37,0.06)",
                        },
                      }}
                    >
                      {/* User info header */}
                      <Box sx={{ px: 2.5, py: 2 }}>
                        <Typography
                          sx={{
                            fontWeight: 700,
                            color: "primary.main",
                            fontSize: "0.95rem",
                          }}
                        >
                          {mockUser.firstName} {mockUser.lastName}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary", fontSize: "0.82rem" }}
                        >
                          {mockUser.email}
                        </Typography>
                      </Box>

                      <Divider />

                      {userMenuItems.map((item) => (
                        <MenuItem
                          key={item.label}
                          component={RouterLink}
                          to={item.href}
                          sx={{
                            py: 1.3,
                            px: 2.5,
                            gap: 1.5,
                            fontSize: "0.9rem",
                            color: "text.primary",
                            "&:hover": {
                              bgcolor: "rgba(196,114,78,0.06)",
                              color: "secondary.main",
                            },
                          }}
                        >
                          <ListItemIcon
                            sx={{ minWidth: "auto", color: "inherit" }}
                          >
                            {item.badge ? (
                              <Badge
                                badgeContent={item.badge}
                                sx={{
                                  "& .MuiBadge-badge": {
                                    bgcolor: "secondary.main",
                                    color: "#fff",
                                    fontSize: "0.6rem",
                                    height: 16,
                                    minWidth: 16,
                                  },
                                }}
                              >
                                {item.icon}
                              </Badge>
                            ) : (
                              item.icon
                            )}
                          </ListItemIcon>
                          {item.label}
                        </MenuItem>
                      ))}

                      <Divider />

                      <MenuItem
                        component={RouterLink}
                        to="/"
                        sx={{
                          py: 1.3,
                          px: 2.5,
                          gap: 1.5,
                          fontSize: "0.9rem",
                          color: "text.secondary",
                          "&:hover": {
                            bgcolor: "rgba(196,114,78,0.06)",
                            color: "secondary.main",
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{ minWidth: "auto", color: "inherit" }}
                        >
                          <LogoutIcon sx={{ fontSize: 20 }} />
                        </ListItemIcon>
                        Sign Out
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <>
                    <Button
                      component={RouterLink}
                      to="/auth/signin"
                      sx={{
                        ml: 1,
                        color: "text.primary",
                        fontWeight: 500,
                        fontSize: "0.95rem",
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: "rgba(61, 47, 37, 0.04)",
                          color: "secondary.main",
                        },
                      }}
                    >
                      Sign In
                    </Button>
                    <Button
                      variant="contained"
                      component={RouterLink}
                      to="/auth/signup"
                      sx={{
                        ml: 0.5,
                        bgcolor: "secondary.main",
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: "0.95rem",
                        textTransform: "none",
                        px: 3,
                        borderRadius: 2,
                        "&:hover": { bgcolor: "secondary.dark" },
                      }}
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </Box>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                {isLoggedIn && (
                  <IconButton
                    component={RouterLink}
                    to="/dashboard"
                    sx={{ color: "primary.main" }}
                    aria-label="Go to dashboard"
                  >
                    <Badge
                      badgeContent={pendingCount}
                      sx={{
                        "& .MuiBadge-badge": {
                          bgcolor: "secondary.main",
                          color: "#fff",
                          fontSize: "0.6rem",
                          height: 16,
                          minWidth: 16,
                        },
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: "primary.main",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                        }}
                      >
                        {initials}
                      </Avatar>
                    </Badge>
                  </IconButton>
                )}
                <IconButton
                  onClick={() => setDrawerOpen(true)}
                  sx={{ color: "primary.main" }}
                  aria-label="Open navigation menu"
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 300,
            bgcolor: "background.paper",
            pt: 2,
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", px: 2, mb: 1 }}>
          <IconButton
            onClick={() => setDrawerOpen(false)}
            aria-label="Close navigation menu"
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {isLoggedIn && (
          <Box
            sx={{
              px: 3,
              pb: 2,
              mb: 1,
              borderBottom: "1px solid",
              borderColor: "rgba(61,47,37,0.08)",
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Avatar
              sx={{
                width: 42,
                height: 42,
                bgcolor: "primary.main",
                fontSize: "0.9rem",
                fontWeight: 700,
              }}
            >
              {initials}
            </Avatar>
            <Box>
              <Typography
                sx={{
                  fontWeight: 700,
                  color: "primary.main",
                  fontSize: "0.95rem",
                  lineHeight: 1.2,
                }}
              >
                {mockUser.firstName} {mockUser.lastName}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", fontSize: "0.78rem" }}
              >
                {mockUser.email}
              </Typography>
            </Box>
          </Box>
        )}

        <List>
          {navLinks.map((link) => (
            <ListItem key={link.href} disablePadding>
              <ListItemButton
                component={RouterLink}
                to={link.href}
                onClick={() => setDrawerOpen(false)}
                selected={location.pathname === link.href}
                sx={{
                  px: 3,
                  py: 1.5,
                  "&.Mui-selected": {
                    bgcolor: "rgba(196, 114, 78, 0.08)",
                    color: "secondary.main",
                    fontWeight: 700,
                  },
                }}
              >
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{
                    fontWeight: location.pathname === link.href ? 700 : 400,
                    fontSize: "1.05rem",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}

          {isLoggedIn && (
            <>
              <Divider sx={{ my: 1 }} />
              {userMenuItems.map((item) => (
                <ListItem key={item.label} disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to={item.href}
                    onClick={() => setDrawerOpen(false)}
                    sx={{
                      px: 3,
                      py: 1.3,
                      gap: 1.5,
                      "&:hover": {
                        bgcolor: "rgba(196,114,78,0.06)",
                        color: "secondary.main",
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: "auto", color: "inherit" }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{ fontSize: "0.95rem" }}
                    />
                    {item.badge ? (
                      <Badge
                        badgeContent={item.badge}
                        sx={{
                          "& .MuiBadge-badge": {
                            bgcolor: "secondary.main",
                            color: "#fff",
                            fontSize: "0.6rem",
                          },
                        }}
                      />
                    ) : null}
                  </ListItemButton>
                </ListItem>
              ))}
            </>
          )}
        </List>

        <Box
          sx={{
            px: 3,
            mt: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          {isLoggedIn ? (
            <Button
              fullWidth
              component={RouterLink}
              to="/"
              onClick={() => setDrawerOpen(false)}
              startIcon={<LogoutIcon />}
              sx={{
                color: "text.secondary",
                fontWeight: 500,
                textTransform: "none",
                py: 1.2,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "rgba(61, 47, 37, 0.15)",
                "&:hover": {
                  borderColor: "secondary.main",
                  color: "secondary.main",
                  backgroundColor: "rgba(196, 114, 78, 0.04)",
                },
              }}
            >
              Sign Out
            </Button>
          ) : (
            <>
              <Button
                variant="contained"
                fullWidth
                component={RouterLink}
                to="/auth/signup"
                onClick={() => setDrawerOpen(false)}
                sx={{
                  bgcolor: "secondary.main",
                  color: "#fff",
                  fontWeight: 600,
                  textTransform: "none",
                  py: 1.2,
                  borderRadius: 2,
                  "&:hover": { bgcolor: "secondary.dark" },
                }}
              >
                Sign Up
              </Button>
              <Button
                fullWidth
                component={RouterLink}
                to="/auth/signin"
                onClick={() => setDrawerOpen(false)}
                sx={{
                  color: "text.primary",
                  fontWeight: 500,
                  textTransform: "none",
                  py: 1.2,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "rgba(61, 47, 37, 0.15)",
                  "&:hover": {
                    borderColor: "secondary.main",
                    color: "secondary.main",
                    backgroundColor: "rgba(196, 114, 78, 0.04)",
                  },
                }}
              >
                Sign In
              </Button>
            </>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
