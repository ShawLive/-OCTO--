window.onload = function () {
	//用于全局的数据获取
	var gData = null;

	//用于处理本页面的业务逻辑
	var logic = {
		/**
		 * 用于页面初始化的逻辑控制
		 */
		init: function () {

			//页面首页数据和DOM元素的渲染（也就是把数据和元素放到页面上的操作）
			logic.fstPageListInit();

			//事件初始化
			event.init();
		},
		/**
		 * 首页的页面数据和页面元素初始化
		 */
		fstPageListInit: function () {
			//假设调用的是ajax请求的数据,那么成功后将会把数据放到我们给的此函数的参数中
			ajax.getFstPageListData(function (res) {
				//将返回的数据重新赋值使用
				var resData = res;
				//赋值给JS内部的全局变量
				gData = resData;

				//获取表格中的body元素
				var tableBodyDom = document.getElementById('tableBody');
				//假设我们规定的是每页显示10条数据
				var limitSize = 10;
				//获取数据的长度，如果获取的数据大于10条就先只取10条，否则就取实际的长度
				var length = resData.data.list.length >= 10 ? 10 : resData.data.list.length;
				//构建一个空的用于存放表格内容的html字符串容器
				var contentHtml = '';
				for (var i = 0; i < length; i++) {
					//获取每一个数据元素
					var itemData = resData.data.list[i];
					//用HTML字符串的形式追加到变量中存下来
					contentHtml += '<tr>'
							+ '<td>' + itemData.no + '</td>'
							+ '<td class="table-operatebox">...'
								+ '<ul class="operate-dropdown">'
									+ '<li>编辑</li>'
									+ '<li>删除</li>'
								+ '</ul>'
							+ '</td>'
							+ '<td>' + itemData.rule + '</td>'
							+ '<td>' + itemData.type + '</td>'
							+ '<td>' + itemData.methods + '</td>'
							+ '<td>' + itemData.calcCoe + '</td>'
							+ '<td>' + itemData.dayLimit + '</td>'
							+ '<td>' + itemData.totalLimit + '</td>'
							+ '<td>' + itemData.validityDate + '</td>'
							+ '<td>' + itemData.dealDate + '</td>'
						+ '</tr>';
				}

				//将整理好的表格数据内容HTML字符串赋值到表格的body内部
				tableBodyDom.innerHTML = contentHtml;

				//表格元素生成后再去绑定事件
				event.tableOperateBind();
			});
		},
		/**
		 * 过滤数据
		 * @param gData {Object} 列表数据
		 * @param term1 {String} 条件1：规则名称
		 * @param term2 {String} 条件1：规则类型
		 */
		filter: function ( gData, term1, term2 ) {
			var resultData = [];

			//遍历数据过滤
			for (var i = 0; i < gData.data.list.length; i++) {
				var item = gData.data.list[i];
				
				//如果条件满足就不过滤，并添加到数组中
				if ( item.rule.indexOf( term1 ) !== -1 && item.type.indexOf( term2 ) !== -1 ) {
					resultData.push( item );
				}
			}

			//将过滤后的数组返回
			return resultData;
		},
		/**
		 * 搜索功能
		 * @param term1 {String} 条件1：规则名称
		 * @param term2 {String} 条件1：规则类型
		 */
		search: function (term1, term2) {
			//获取所有的数据
			var resData = logic.filter( gData, term1, term2);

			//获取表格中的body元素
			var tableBodyDom = document.getElementById('tableBody');
			//假设我们规定的是每页显示10条数据
			var limitSize = 10;
			//获取数据的长度，如果获取的数据大于10条就先只取10条，否则就取实际的长度
			var length = resData.length >= 10 ? 10 : resData.length;
			//构建一个空的用于存放表格内容的html字符串容器
			var contentHtml = '';
			for (var i = 0; i < length; i++) {
				//获取每一个数据元素
				var itemData = resData[i];
				//用HTML字符串的形式追加到变量中存下来
				contentHtml += '<tr>'
						+ '<td>' + itemData.no + '</td>'
						+ '<td class="table-operatebox">...'
							+ '<ul class="operate-dropdown">'
								+ '<li>编辑</li>'
								+ '<li>删除</li>'
							+ '</ul>'
						+ '</td>'
						+ '<td>' + itemData.rule + '</td>'
						+ '<td>' + itemData.type + '</td>'
						+ '<td>' + itemData.methods + '</td>'
						+ '<td>' + itemData.calcCoe + '</td>'
						+ '<td>' + itemData.dayLimit + '</td>'
						+ '<td>' + itemData.totalLimit + '</td>'
						+ '<td>' + itemData.validityDate + '</td>'
						+ '<td>' + itemData.dealDate + '</td>'
					+ '</tr>';
			}

			//将整理好的表格数据内容HTML字符串赋值到表格的body内部
			tableBodyDom.innerHTML = contentHtml;

			//表格元素生成后再去绑定事件
			event.tableOperateBind();
		}
	};
	
	//用于ajax请求的逻辑集合
	var ajax = {
		/**
		 * 模拟获取首页的表格数据（此处并没用到ajax技术）
		 * @param successFuc {Function} 用于接收成功的数据返回
		 */
		getFstPageListData: function ( successFuc ) {
			//造的假数据
			var data = {
				code: 1,
				data: {
					list: [
						{
							no: 1,
							rule: '获取积分-交易额',
							type: '获取',
							methods: '乘',
							calcCoe: 1,
							dayLimit: 12312,
							totalLimit: 123132,
							validityDate: '一年',
							dealDate: '2017-01-04 17:45:01'
						},
						{
							no: 2,
							rule: '获取积分-签到',
							type: '使用',
							methods: '乘',
							calcCoe: 1,
							dayLimit: 12312,
							totalLimit: 123132,
							validityDate: '一年',
							dealDate: '2017-01-04 17:45:01'
						},
						{
							no: 3,
							rule: '获取积分-评价',
							type: '获取',
							methods: '乘',
							calcCoe: 1,
							dayLimit: 12312,
							totalLimit: 123132,
							validityDate: '一年',
							dealDate: '2017-01-04 17:45:01'
						},
						{
							no: 4,
							rule: '获取积分-签到',
							type: '使用',
							methods: '乘',
							calcCoe: 1,
							dayLimit: 12312,
							totalLimit: 123132,
							validityDate: '一年',
							dealDate: '2017-01-04 17:45:01'
						},
						{
							no: 5,
							rule: '获取积分-签到',
							type: '获取',
							methods: '乘',
							calcCoe: 1,
							dayLimit: 12312,
							totalLimit: 123132,
							validityDate: '一年',
							dealDate: '2017-01-04 17:45:01'
						},
						{
							no: 6,
							rule: '获取积分-评价',
							type: '使用',
							methods: '乘',
							calcCoe: 1,
							dayLimit: 12312,
							totalLimit: 123132,
							validityDate: '一年',
							dealDate: '2017-01-04 17:45:01'
						},
						{
							no: 7,
							rule: '获取积分-交易额',
							type: '使用',
							methods: '乘',
							calcCoe: 1,
							dayLimit: 12312,
							totalLimit: 123132,
							validityDate: '一年',
							dealDate: '2017-01-04 17:45:01'
						},
						{
							no: 8,
							rule: '获取积分-评价',
							type: '获取',
							methods: '乘',
							calcCoe: 1,
							dayLimit: 12312,
							totalLimit: 123132,
							validityDate: '一年',
							dealDate: '2017-01-04 17:45:01'
						},
						{
							no: 9,
							rule: '获取积分-交易额',
							type: '使用',
							methods: '乘',
							calcCoe: 1,
							dayLimit: 12312,
							totalLimit: 123132,
							validityDate: '一年',
							dealDate: '2017-01-04 17:45:01'
						},
						{
							no: 10,
							rule: '获取积分-签到',
							type: '获取',
							methods: '乘',
							calcCoe: 1,
							dayLimit: 12312,
							totalLimit: 123132,
							validityDate: '一年',
							dealDate: '2017-01-04 17:45:01'
						},
						{
							no: 11,
							rule: '获取积分-交易额',
							type: '使用',
							methods: '乘',
							calcCoe: 1,
							dayLimit: 12312,
							totalLimit: 123132,
							validityDate: '一年',
							dealDate: '2017-01-04 17:45:01'
						}
					]
				},
				message: '成功'
			};
			
			//将数据返回给调用请求的回调函数
			successFuc( data );
		}
	};
	
	//用于处理所有的事件相关
	var event = {
		/**
		 * 事件初始化
		 */
		init: function () {
			//获取规则类型元素，和规则类型的下拉选框元素
			var rtDom = document.getElementById('rulesType');
			var rtlDom = document.getElementById('rulesTypeList');
			//规则类型元素点击，弹出规则类型的下拉选框元素
			rtDom.onclick = function () {
				//如果没有获取到规则类型的下拉选框元素的display样式，或者此样式是隐藏的，那么就显示出来用于选择
				if ( !rtlDom.style.display || rtlDom.style.display === 'none' ) {
					rtlDom.style.display = 'block';
				} else {
					//否则就隐藏规则类型的下拉选框元素
					rtlDom.style.display = 'none';
				}
			};

			//获取规则类型的下拉选框元素内部的每一项DOM元素的数组集合
			var typeItemDoms = document.getElementsByClassName('type-item');
			//因为有多个选项，所以每一个选项都要绑定点击事件
			for (var i = 0; i < typeItemDoms.length; i++) {
				typeItemDoms[i].onclick = function () {
					//获取选中的选项中的文本内容
					var type = this.innerText;
					//赋值所选值到选择元素中
					rtDom.value = type;
					//然后隐藏选择容器
					rtlDom.style.display = 'none';
				};
			}

			//获取分页列表元素，和分页列表中的选项DOM元素数组
			var pageListDom = document.getElementById('pageList');
			var pageItemDoms = pageListDom.getElementsByClassName('page-num');
			//因为有多个选项，所以每一个选项都要绑定点击事件
			for (var j = 0; j < pageItemDoms.length; j++) {
				pageItemDoms[j].onclick = function () {
					//移除前一个激活的分页按钮
					var aItemDom = pageListDom.getElementsByClassName('active')[0];
					aItemDom.classList.remove('active');

					//激活当前点击的本身对象
					this.classList.add('active');
				};
			}

			//获取搜索按钮元素、搜索的第一个条件input元素
			var searchBtn = document.getElementById('btnSearch');
			var rNameDom = document.getElementById('rulesName');
			searchBtn.onclick = function () {
				//获取两个搜索元素的内容
				var term1 = rNameDom.value;
				var term2 = rtDom.value;

				//开始搜索
				logic.search(term1, term2);
			};
		},
		/**
		 * 表格元素中的相关操作元素的事件绑定
		 */
		tableOperateBind: function () {
			//获取表格内的可操作元素数组
			var tOperateDoms = document.getElementsByClassName('table-operatebox');
			for (var i = 0; i < tOperateDoms.length; i++) {
				//事件绑定
				tOperateDoms[i].onclick = function ( event ) {
					var dropDom = this.getElementsByClassName('operate-dropdown')[0];
					
					//如果是隐藏的或者未设置样式就显示
					if ( !dropDom.style.display || dropDom.style.display === 'none' ) {
						dropDom.style.display = 'block';
					} else {
						//否则隐藏
						dropDom.style.display = 'none';
					}
				}
			}
		}
	};

	//启动页面初始化
	logic.init();
};