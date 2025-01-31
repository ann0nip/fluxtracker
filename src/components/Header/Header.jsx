import "./Header.scss";
import ReactFlagsSelect from "react-flags-select";
import { customLabels, locales } from "../../locales";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { setLocale } from "react-redux-i18n";
import { KEY_LANGUAGE_LOCAL_STORAGE } from "../../locales";
import { ReactComponent as MultiversxLogo } from "../CustomIcons/MultiversxLogo/MultiversxLogo.svg";
import { ReactComponent as MultiversxIcon } from "../CustomIcons/MultiversxIcon/MultiversxIcon.svg";
import { Container, Navbar, Offcanvas, Nav } from "react-bootstrap";
import { FaHeart, FaTelegram, FaTwitter, FaGithub } from "react-icons/fa";
import { QRCodeSVG } from "qrcode.react";
import { LOGO_FONT_SIZE } from "../../config/constants";

const Header = ({ setLocale, locale, egldPrice, translations }) => {
	return (
		<Navbar className="bg-navbar sticky-top" expand={false}>
			<Container fluid>
				<NavLink
					to="/search"
					className="d-flex rounded p-2 align-items-center navbar-brand maiar-shadow p-0 m-0"
				>
					<div className="me-md-3 d-none d-md-block">
						<MultiversxLogo />
					</div>
					<span className="p-0 ps-md-3 text-secondary text-truncate">
						Fluxtracker
					</span>
				</NavLink>
				<div className="d-flex">
					<span
						className="d-flex align-items-center me-2"
						style={{ gap: ".5em" }}
					>
						{`${egldPrice.toFixed(2)}$`}
						<MultiversxIcon
							style={{
								height: `1.5em`,
								width: "100%",
								fill: "white",
								WebkitTransition: "all 200ms linear",
								transition: "all 200ms linear"
							}}
						/>
					</span>
					<ReactFlagsSelect
						className="pb-0 locales-selector"
						countries={Object.keys(locales)}
						showOptionLabel={true}
						showSelectedLabel={false}
						fullWidth={false}
						customLabels={customLabels}
						selected={locale}
						onSelect={code => setLocale(code)}
					/>

					<Navbar.Toggle aria-controls="offcanvasNavbar" className="ms-2" />
				</div>
				<Navbar.Offcanvas
					style={{
						backgroundColor: "var(--bg-color--header)",
						color: "var(--font-color-header)"
					}}
					id="offcanvasNavbar"
					aria-labelledby="offcanvasNavbarLabel"
					placement="end"
				>
					<Offcanvas.Header closeButton>
						<Offcanvas.Title id="offcanvasNavbarLabel">
							Fluxtracker
						</Offcanvas.Title>
					</Offcanvas.Header>
					<Offcanvas.Body className="d-flex flex-column justify-content-between">
						<Nav>
							<NavLink to="/search">{translations?.home}</NavLink>
							<NavLink to="/mex-stats">{translations?.mex_stats}</NavLink>
							<p className="text-muted">{translations?.more_coming_soon}</p>
							<div className="support d-flex flex-column"></div>
						</Nav>
						<Nav>
							<hr />
							<span className="flex-wrap" style={{ wordBreak: "break-word" }}>
								{translations?.if_you_want_to_support}
							</span>
							<label
								className="flex-wrap align-self-center mt-3"
								style={{ wordBreak: "break-word" }}
							>
								<span className="me-1" style={{ color: "#EC4899" }}>
									@
								</span>
								fluxy
							</label>
							<QRCodeSVG
								className="align-self-center my-3"
								value={
									"erd16flffuf6nkqy8ywz3dguu0hm0hlza4mvrwqejtyd7euu2ja8xalqutan2g"
								}
								size={200}
								bgColor={"#ffffff"}
								fgColor={"var(--primary-color)"}
								level={"L"}
								includeMargin={true}
								imageSettings={{
									src:
										"https://play-lh.googleusercontent.com/DfD8BH0veJ1lCAdlZBfVj5HdK6-vjl9UcFxLGIuyc2RvQs-KCiW4yJKWz-4gSkNy5RA=s180-rw",
									x: null,
									y: null,
									height: 36,
									width: 36,
									excavate: true
								}}
							/>
							<span
								className="flex-wrap align-self-center"
								style={{ wordBreak: "break-word" }}
							>
								{translations?.thanks_for_your_support}
								<FaHeart className="text-danger ms-1"></FaHeart>
							</span>
							<hr />
							<div
								className="d-flex align-items-center justify-content-center"
								style={{ gap: "1rem" }}
							>
								<a
									data-splitbee-event="Click on Twitter link"
									href="https://twitter.com/Fluxylynxx"
									target="_blank"
									rel="noopener noreferrer"
									className="p-2 d-flex align-items-center justify-content-center"
									style={{ borderRadius: "100%" }}
								>
									<FaTwitter color="#0088cc" size={LOGO_FONT_SIZE} />
								</a>
								<a
									data-splitbee-event="Click on Telegram link"
									href="https://t.me/fluxy56"
									target="_blank"
									rel="noopener noreferrer"
									className="p-2 d-flex align-items-center justify-content-center"
									style={{ borderRadius: "100%" }}
								>
									<FaTelegram color="#0088cc" size={LOGO_FONT_SIZE} />
								</a>
								<a
									data-splitbee-event="Click on GitHub link"
									href="https://github.com/Fluksy/fluxtracker"
									target="_blank"
									rel="noopener noreferrer"
									className="p-2 d-flex align-items-center justify-content-center"
									style={{ borderRadius: "100%" }}
								>
									<FaGithub color="#0088cc" size={LOGO_FONT_SIZE} />
								</a>
							</div>
						</Nav>
					</Offcanvas.Body>
				</Navbar.Offcanvas>
			</Container>
		</Navbar>
	);
};

const mapStateToProps = ({ i18n, egldPrice }) => ({
	locale: i18n.locale,
	egldPrice,
	translations: i18n?.translations[i18n.locale]
});
const mapDispatchToProps = dispatch => ({
	setLocale: locale => {
		dispatch(setLocale(locale));
		localStorage.setItem(KEY_LANGUAGE_LOCAL_STORAGE, locale);
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
