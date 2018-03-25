//定义工具
'use strict';

var ajaxUtil = {
	ajax: function ajax(url, fn) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		xhr.send(null);
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4 && xhr.status) {
				var data = JSON.parse(xhr.responseText);
				fn && fn(data);
			}
		};
	}
};
//定义Nav组件
var Nav = React.createClass({
	displayName: 'Nav',

	//初始化状态
	getInitialState: function getInitialState() {
		var cls = {};
		cls[this.props.defaultFocus] = 'choose';
		return {
			cls: cls
		};
	},
	//切换组件
	changePage: function changePage(v) {
		//点击后给a添加.choose样式
		var cls = {};
		cls[v] = 'choose';
		this.setState({
			cls: cls
		});
		//向父组件通信，传递数据
		this.props.changeFatherPageState(v);
	},
	render: function render() {
		return React.createElement(
			'div',
			{ className: 'header navbar navbar-static-top' },
			React.createElement(
				'div',
				{ className: 'container' },
				React.createElement(
					'div',
					{ className: 'navbar-header' },
					React.createElement(
						'a',
						{ className: 'navbar-brand', onClick: this.changePage.bind(this, 'Home') },
						'Bootstrap'
					)
				),
				React.createElement(
					'ul',
					{ className: 'nav navbar-nav pull-right' },
					React.createElement(
						'li',
						null,
						React.createElement(
							'a',
							null,
							'主题/模板'
						)
					),
					React.createElement(
						'li',
						null,
						React.createElement(
							'a',
							null,
							'Bootstrap中文网'
						)
					)
				),
				React.createElement(
					'ul',
					{ className: 'nav navbar-nav' },
					React.createElement(
						'li',
						null,
						React.createElement(
							'a',
							{ className: this.state.cls.Start, onClick: this.changePage.bind(this, 'Start') },
							'起步'
						)
					),
					React.createElement(
						'li',
						null,
						React.createElement(
							'a',
							{ className: this.state.cls.Css, onClick: this.changePage.bind(this, 'Css') },
							'全局css样式'
						)
					),
					React.createElement(
						'li',
						null,
						React.createElement(
							'a',
							{ className: this.state.cls.Component, onClick: this.changePage.bind(this, 'Component') },
							'组件'
						)
					),
					React.createElement(
						'li',
						null,
						React.createElement(
							'a',
							{ className: this.state.cls.Js, onClick: this.changePage.bind(this, 'Js') },
							'JavaScript插件'
						)
					),
					React.createElement(
						'li',
						null,
						React.createElement(
							'a',
							{ className: this.state.cls.Maker, onClick: this.changePage.bind(this, 'Maker') },
							'定制'
						)
					),
					React.createElement(
						'li',
						null,
						React.createElement(
							'a',
							null,
							'网站实例'
						)
					)
				),
				React.createElement('div', null)
			)
		);
	}
});
//定义Foot组件
var Foot = React.createClass({
	displayName: 'Foot',

	render: function render() {
		return React.createElement(
			'div',
			{ className: 'foot' },
			React.createElement(
				'div',
				{ className: 'container' },
				React.createElement(
					'div',
					null,
					React.createElement(
						'a',
						{ href: '' },
						'GitHub 仓库'
					),
					React.createElement(
						'a',
						{ href: '' },
						'实例'
					),
					React.createElement(
						'a',
						{ href: '' },
						'优站精选'
					),
					React.createElement(
						'a',
						{ href: '' },
						'关于'
					)
				),
				React.createElement(
					'p',
					null,
					'Designed and built with all the love in the world by ',
					React.createElement(
						'a',
						{ href: '' },
						'@mdo'
					),
					' and ',
					React.createElement(
						'a',
						{ href: '' },
						'@fat'
					),
					'. Maintained by the ',
					React.createElement(
						'a',
						{ href: '' },
						'core team'
					),
					' with the help of ',
					React.createElement(
						'a',
						{ href: '' },
						'our contributors'
					),
					'. 本项目源码受 ',
					React.createElement(
						'a',
						{ href: '' },
						'MIT'
					),
					'开源协议保护，文档受 ',
					React.createElement(
						'a',
						{ href: '' },
						'CC BY 3.0'
					),
					' 开源协议保护。'
				)
			)
		);
	}
});
//定义Home页组件
var Home = React.createClass({
	displayName: 'Home',

	//初始化状态数据
	getInitialState: function getInitialState() {
		return {
			firstList: [{
				img: 'img/sass-less.png',
				h3: '预处理脚本',
				p: '虽然可以直接使用 Bootstrap 提供的 CSS 样式表，不要忘记 Bootstrap 的源码是基于最流行的 CSS 预处理脚本 - <a href="">Less</a> 和 <a href="">Sass</a> 开发的。你可以采用预编译的 CSS 文件快速开发，也可以从源码定制自己需要的样式。'
			}, {
				img: 'img/devices.png',
				h3: '一个框架、多种设备',
				p: '你的网站和应用能在 Bootstrap 的帮助下通过同一份代码快速、有效适配手机、平板、PC 设备，这一切都是 CSS 媒体查询（Media Query）的功劳。'
			}, {
				img: 'img/components.png',
				h3: '特性齐全',
				p: 'Bootstrap 提供了全面、美观的文档。你能在这里找到关于 HTML 元素、HTML 和 CSS 组件、jQuery 插件方面的所有详细文档。'
			}],
			secondList: [{
				img: 'img/01.png'
			}, {
				img: 'img/02.jpg'
			}, {
				img: 'img/03.png'
			}, {
				img: 'img/04.png'
			}]
		};
	},
	createLi: function createLi(data) {
		return data.map(function (obj, index) {
			//根据状态数据选择虚拟dom
			if (obj.h3 && obj.p) {
				//想要渲染出数据中的<a>标签
				var content = {
					__html: obj.p
				};
				return React.createElement(
					'li',
					{ key: index },
					React.createElement('img', { src: obj.img, alt: '' }),
					React.createElement(
						'h3',
						null,
						obj.h3
					),
					React.createElement('p', { dangerouslySetInnerHTML: content })
				);
			} else {}
			return React.createElement(
				'li',
				{ key: index },
				React.createElement('img', { src: obj.img, alt: '' })
			);
		});
	},
	render: function render() {
		return React.createElement(
			'div',
			{ className: 'home', style: { display: this.props.show } },
			React.createElement(
				'div',
				{ className: 'banner' },
				React.createElement(
					'div',
					{ className: 'container' },
					React.createElement(
						'div',
						{ className: 'B' },
						'B'
					),
					React.createElement(
						'h1',
						null,
						'Bootstrap 是最受欢迎的 HTML、CSS 和 JS 框架，用于开发响应式布局、移动设备优先的 WEB 项目。'
					),
					React.createElement(
						'a',
						{ href: '', className: 'btn btn-lg' },
						'下载 BootStrap'
					),
					React.createElement(
						'p',
						null,
						'当前版本： v3.3.7 | 文档更新于：2017-01-23'
					)
				)
			),
			React.createElement(
				'div',
				{ className: 'container' },
				React.createElement(
					'div',
					{ className: 'first-section' },
					React.createElement(
						'h1',
						null,
						'为所有开发者、所有应用场景而设计。'
					),
					React.createElement(
						'p',
						{ className: 'info' },
						'Bootstrap 让前端开发更快速、简单。所有开发者都能快速上手、所有设备都可以适配、所有项目都适用。'
					),
					React.createElement('div', { className: 'line' }),
					React.createElement(
						'ul',
						{ className: 'clearfix' },
						this.createLi(this.state.firstList)
					),
					React.createElement('div', { className: 'line' }),
					React.createElement(
						'p',
						null,
						'Bootstrap 是完全开源的。它的代码托管、开发、维护都依赖 GitHub 平台。'
					),
					React.createElement(
						'button',
						{ className: 'btn btn-lg' },
						'查看GetHub项目主页'
					)
				),
				React.createElement('div', { className: 'device-line' }),
				React.createElement(
					'div',
					{ className: 'second-section' },
					React.createElement(
						'h1',
						null,
						'基于 Bootstrap 构建的网站'
					),
					React.createElement(
						'p',
						{ className: 'info' },
						'全球数以百万计的网站都是基于 Bootstrap 构建的。你可以先参观一下我们提供的',
						React.createElement(
							'a',
							{ href: '' },
							'实例精选'
						),
						'或者看一看我们粉丝的网站吧。'
					),
					React.createElement('div', { className: 'line' }),
					React.createElement(
						'ul',
						{ className: 'clearfix' },
						this.createLi(this.state.secondList)
					),
					React.createElement('div', { className: 'line' }),
					React.createElement(
						'p',
						null,
						'我们在“优站精选”里展示了许多精美的 Bootstrap 网站。'
					),
					React.createElement(
						'button',
						{ className: 'btn btn-lg' },
						'逛一逛“优站精选”'
					)
				)
			),
			React.createElement(Foot, null)
		);
	}
});
//定义Article组件
var Article = React.createClass({
	displayName: 'Article',

	createSection: function createSection() {
		return this.props.data.map(function (obj, index) {
			return React.createElement(
				'li',
				{ key: index },
				React.createElement(
					'h2',
					{ id: obj.id },
					obj.title
				),
				React.createElement('div', { className: 'device-line' }),
				React.createElement(
					'p',
					null,
					obj.content
				)
			);
		});
	},
	render: function render() {
		return React.createElement(
			'div',
			{ className: 'article' },
			React.createElement(
				'ul',
				null,
				this.createSection()
			)
		);
	}
});
//定义Aside组件
var Aside = React.createClass({
	displayName: 'Aside',

	createLi: function createLi() {
		return this.props.data.map(function (obj, index) {
			return React.createElement(
				'li',
				{ key: index },
				React.createElement(
					'a',
					{ href: '#' + obj.id },
					obj.title
				)
			);
		});
	},
	render: function render() {
		return React.createElement(
			'div',
			{ className: 'aside' },
			React.createElement(
				'ul',
				null,
				this.createLi()
			)
		);
	}
});
//定义Content组件
var Content = React.createClass({
	displayName: 'Content',

	render: function render() {
		return React.createElement(
			'div',
			{ className: 'container addPadding' },
			React.createElement(Article, { data: this.props.data }),
			React.createElement(Aside, { data: this.props.data })
		);
	}
});
//定义Start页组件
var Page = React.createClass({
	displayName: 'Page',

	//初始化状态数据
	getInitialState: function getInitialState() {
		return {
			data: []
		};
	},
	//使用混合中的方法
	mixins: [ajaxUtil],
	render: function render() {
		return React.createElement(
			'div',
			{ className: 'page', style: { display: this.props.show } },
			React.createElement(
				'div',
				{ className: 'banner' },
				React.createElement(
					'div',
					{ className: 'container' },
					React.createElement(
						'h1',
						null,
						this.props.tit
					),
					React.createElement(
						'p',
						null,
						this.props.cot
					)
				)
			),
			React.createElement(Content, { data: this.state.data }),
			React.createElement(Foot, null)
		);
	},
	componentDidMount: function componentDidMount() {
		var me = this;
		this.ajax(this.props.url, function (res) {

			me.setState({
				data: res
			});
		});
	}
});
//定义App组件
var App = React.createClass({
	displayName: 'App',

	//初始化状态
	getInitialState: function getInitialState() {
		var page = {
			Home: 'none',
			Start: 'none',
			Css: 'none',
			Component: 'none',
			Js: 'none',
			Maker: 'none'
		};
		//根据传进来的属性更改状态（确定默认显示页面）
		page[this.props.pageName] = 'block';

		return {
			page: page
		};
	},
	//定义供子组件向父组件通信的方法 改变父组件state.page
	changePageState: function changePageState(v) {
		var page = this.state.page;
		for (var key in page) {
			page[key] = 'none';
		}
		page[v] = 'block';
		this.setState({
			page: page
		});
	},
	render: function render() {
		var page = this.state.page;
		return React.createElement(
			'div',
			null,
			React.createElement(Nav, { changeFatherPageState: this.changePageState, defaultFocus: this.props.pageName }),
			React.createElement(Home, { show: page.Home }),
			React.createElement(Page, { show: page.Start, tit: '起步', cot: '简要介绍 Bootstrap，以及如何下载、使用，还有基本模版和案例，等等。', url: 'data/start.json' }),
			React.createElement(Page, { show: page.Css, tit: '全局 CSS 样式', cot: '设置全局 CSS 样式；基本的 HTML 元素均可以通过 class 设置样式并得到增强效果；还有先进的栅格系统。', url: 'data/css.json' }),
			React.createElement(Page, { show: page.Component, tit: '组件', cot: '无数可复用的组件，包括字体图标、下拉菜单、导航、警告框、弹出框等更多功能。', url: 'data/Component.json' }),
			React.createElement(Page, { show: page.Js, tit: 'JavaScript插件', cot: 'jQuery 插件为 Bootstrap 的组件赋予了“生命”。可以简单地一次性引入所有插件，或者逐个引入到你的页面中。', url: 'data/js.json' }),
			React.createElement(Page, { show: page.Maker, tit: '定制', cot: '通过自定义 Bootstrap 组件、Less 变量和 jQuery 插件，定制一份属于你自己的 Bootstrap 版本吧。', url: 'data/download.json' })
		);
	}
});
//渲染组件
//传入的属性数据决定初始页面
ReactDOM.render(React.createElement(App, { pageName: 'Home' }), document.getElementById('app'));