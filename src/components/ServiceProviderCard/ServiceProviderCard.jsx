import { useEffect, useState } from "react";
import { FaTwitter, FaGithub, FaLink, FaServer, FaPercent } from "react-icons/fa";
import { GoVerified } from "react-icons/go";
import { Card, CardBody, CardFooter, CardHeader, CardImg, CardText, CardTitle } from "reactstrap";
import { getProviderInfos } from "../../config/api.fluxtracker";
import './ServiceProviderCard.scss';

const LOGO_FONT_SIZE = 22;

const ServiceProviderCard = (props) => {

	const [provider, setProvider] = useState();
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			const { data } = await getProviderInfos(props.contract);
			setProvider(data);
			setLoading(false);
		}
		fetchData();
	}, [props.contract])

	return (
		<Card className="custom-card card border-card">
			{loading && !provider ?
				<div>Loading...</div> :
				<>
					<CardHeader className="d-flex align-items-center">
						<CardImg src={provider?.identity?.avatar}></CardImg>
						<CardTitle className="flex-grow-1 text-center">
							<span>{provider?.identity?.name}</span>
						</CardTitle>
						{!!provider?.featured && <GoVerified style={{color: 'var(--primary-color)'}} size={LOGO_FONT_SIZE} />}
					</CardHeader>
					<CardBody>
						<CardText>{provider?.identity.description}</CardText>
					</CardBody>
					<CardFooter className="d-flex align-items-center" style={{gap: '.3em'}}>
						<div className="d-flex align-items-center flex-grow-1" style={{gap: '.3em'}}>
							{!!provider?.numNodes && 
								<>
									<span>{`${provider?.numNodes}`}</span>
									<FaServer style={{color: 'var(--primary-color)'}} size={LOGO_FONT_SIZE}/>
								</>
							}
							{!!provider?.apr && 
								<>
									<span>{`${provider?.apr}`}</span>
									<FaPercent style={{color: 'var(--primary-color)'}} size={LOGO_FONT_SIZE}/>
								</>
							}
						</div>
						<div className="d-flex">
							{!!provider?.identity?.url && <a className="p-2 d-flex" href={provider?.identity?.url} target='_blank' rel="noopener noreferrer"><FaLink style={{color: 'var(--primary-color)'}} size={LOGO_FONT_SIZE} /></a>}
							{!!provider?.identity.github && <a className="p-2 d-flex" href={provider?.identity.github} target='_blank' rel="noopener noreferrer"><FaGithub style={{color: 'var(--primary-color)'}} size={LOGO_FONT_SIZE} /></a>}
							{!!provider?.identity.twitter && <a className="p-2 d-flex" href={provider?.identity.twitter} target='_blank' rel="noopener noreferrer"><FaTwitter style={{color: 'var(--primary-color)'}} size={LOGO_FONT_SIZE} /></a>}
						</div>
					</CardFooter>
				</>

			}
		</Card>
	)
}

export default ServiceProviderCard;
