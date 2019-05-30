import React from 'react'
import Header from './Header'
import Footer from './Footer'
const Layout: React.FC<{ menuDrop: boolean }> = props => {
	return (
		<>
			<Header {...props} />
			{props.children}
			<Footer />
			<style global jsx>{`
				hot {
					color: #ff3366;
				}
				.layout {
					width: 1200px;
					margin: 0 auto;
				}
				.flex {
					display: flex;
				}
				html,
				body,
				#root {
					height: 100%;
				}

				* {
					margin: 0;
					padding: 0;
					box-sizing: border-box;
				}

				body {
					font-family: 'Helvetica Neue', Helvetica, Arial, 'Microsoft Yahei', 'Hiragino Sans GB', 'Heiti SC', 'WenQuanYi Micro Hei',
						sans-serif;
				}
				em,
				i {
					font-style: normal;
				}
				a {
					text-decoration: none;
					color: inherit;
				}
				li {
					list-style: none;
				}
				button {
					cursor: pointer;
				}
				.clearfix:after {
					content: '';
					display: block;
					clear: both;
				}
			`}</style>
		</>
	)
}
export default Layout
