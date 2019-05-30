import React from 'react'
import style from './Box.less'

const Box = (props: any) => {
	const item = props.product

	return (
		<div className={style.box}>
			<a href="javacript:;" className={style.boxWrap}>
				<img className={style.proImg} src={item.pic_url} alt="" />
				<h4 className={style.title} dangerouslySetInnerHTML={{ __html: item.highlights.title }} />
				<div className={style.itemPrice}>
					<div className={style.priceNum}>
						<em>
							<i>¥</i>
							{item.price}
						</em>
					</div>
					<div className={style.priceSale}>全网销量1万</div>
				</div>
			</a>
			<a href="" className={style.itemCompare}>
				<span style={{ marginRight: 10, color: '#666' }}>京东</span>等<em>86</em>个商家比价>
			</a>
		</div>
	)
}

export default Box
