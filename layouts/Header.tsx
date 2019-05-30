import React, { useState, useEffect } from 'react'
import { Input, Select, Icon, AutoComplete, Button } from 'antd'
import { debounce } from '../utils/utils'

import hs from './Header.less'

// import img from '@/assets/logo.png'
import * as api from '../services/api'
import { SelectValue } from 'antd/lib/select'
const { Search } = Input
const { Option } = AutoComplete

//三层商品分类
interface Item {
	id: number
	name: string
	parent_id: number
	status: number
}
interface Menu extends Item {
	cats: Cat[]
}
interface Cat extends Item {
	list: Item[]
}

const Header: React.FC<{ menuDrop: boolean }> = props => {
	const menuDrop = props.menuDrop
	const [allCategory, setAllCategory] = useState(false)
	const [menuIsDrop, setMenuIsDrop] = useState(menuDrop)

	const [dataSource, setDataSource] = useState([])
	const [query, setQuery] = useState<SelectValue>('')
	const [meunList, setMenuList] = useState<Menu[]>([])

	useEffect(() => {
		api.list().then(res => {
			let temp: Menu[] = []
			temp = res.filter(item => item.parent_id === 0)
			for (const i of temp) {
				i.cats = res.filter(item => item.parent_id === i.id)
			}
			for (const i of temp) {
				for (const j of i.cats) {
					j.list = res.filter(item => item.parent_id === j.id)
				}
			}
			console.log(temp)
			setMenuList(temp)
		})
	}, [])

	const shopNavList = ['首页', '热卖商品', '全网比价', '限时折扣', '价格趋势']
	const toggleMenu = () => {
		setMenuIsDrop(!menuIsDrop)
	}

	const renderOption = item => {
		return (
			<Option key={item.word} value={item.word}>
				<div className="global-search-item">
					<span className="global-search-item-desc">
						<a href="javascript:;" style={{ color: 'rgba(0,0,0,.65)' }}>
							{item.word}
						</a>
					</span>
				</div>
			</Option>
		)
	}
	/**
	 * 获取关键字
	 */
	const handleSearch = debounce((query: string) => {
		if (query === '') return
		api.getSearchPrompt(query).then(res => {
			console.log(res)
			setDataSource(res.items)
		})
	}, 500)

	const changeHandler = (value: SelectValue) => {
		console.log(value)
		setDataSource([])
		setQuery(value)
	}
	/**
	 * 搜索商品
	 */
	const searchResult = (value: string, e?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>) => {
		e!.preventDefault()

		console.log(query)
	}
	return (
		<>
			<nav className={hs.nav}>
				<div className="layout clearfix">
					<ul className={hs.navCon}>
						<li className={hs.navLi}>
							<div className={hs.h}>
								<a href="javascript:;">我的</a>
							</div>
						</li>
						<li className={hs.navLi}>
							<div className={hs.h}>
								<a href="javascript:;">全部分类</a>
							</div>
						</li>
						<li className={hs.navLi}>
							<div className={hs.h}>
								<a href="javascript:;">服务与支持</a>
							</div>
						</li>
					</ul>
				</div>
			</nav>

			<header>
				<div className="layout flex">
					<div className={hs.logoWrap}>
						<a href="/" style={{ display: 'block' }}>
							<img src={'/static/logo.png'} alt="" />
						</a>
					</div>
					<div className={hs.searchWrap}>
						<Select defaultValue="比价" style={{ width: 90, fontSize: 14 }} size="large">
							<Select.Option value="比价">比价</Select.Option>
							<Select.Option value="折扣">折扣</Select.Option>
						</Select>
						<AutoComplete
							className="global-search"
							size="large"
							dataSource={dataSource.map(renderOption)}
							onSearch={handleSearch}
							placeholder="input here"
							style={{ width: 515 }}
							optionLabelProp="value"
							onChange={changeHandler}
						>
							<Search size="large" enterButton onSearch={searchResult} />
						</AutoComplete>
					</div>
				</div>
			</header>

			<div className={hs.shopNavWrap}>
				<div className="layout flex">
					<div className={hs.shopNav}>
						商品分类
						<Icon type="bars" style={{ fontSize: '22px', color: '#fff' }} onClick={toggleMenu} />
						{menuIsDrop && (
							<ul className={hs.proMenuList}>
								{meunList.map((menu, index) => (
									<li
										key={menu.id}
										style={{
											height: index >= 10 && !allCategory ? 0 : 36
										}}
										className={hs.proMenuLabel + ' ' + (index >= 10 && allCategory ? hs.showCatAni : '')}
									>
										<a className={hs.catLabel} href="">
											{menu.name}
										</a>

										{/* 这里是具体分类的tooltip */}
										<div
											className={hs.proMenuWrap}
											// style={{ display: hoverIndex === undefined ? 'none' : '' }}
										>
											{menu.cats.map((detail, index) => (
												<div key={detail.id} className={hs.menuCatLine}>
													<div className={hs.proMenuDetailLeft}>
														<a href="">{detail.name}</a>
													</div>
													<div className={hs.proMenuDetailRight}>
														{detail.list.map(tag => (
															<span className={hs.catD} key={tag.id}>
																<a href="">{tag.name}</a>
															</span>
														))}
													</div>
												</div>
											))}
										</div>
									</li>
								))}
								<li
									onClick={() => setAllCategory(!allCategory)}
									style={{
										position: 'relative',
										zIndex: 30,
										borderBottom: '1px solid #ddd'
									}}
									className={hs.proMenuLabel}
								>
									<a
										className={hs.catLabel}
										href="javascript:;"
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center'
										}}
									>
										全部分类
										<Icon type={!allCategory ? 'down' : 'up'} />
									</a>
								</li>
							</ul>
						)}
					</div>
					<ul className={hs.shopNavList}>
						{shopNavList.map(item => (
							<li key={item}>
								<a href="">{item}</a>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	)
}

export default Header
