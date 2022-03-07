if(typeof firstText=="undefined")
	{
	firstText="First"
}
if(typeof lastText=="undefined")
	{
	lastText="Last"
}
var noPage;
var currentPage;
var currentPageNo;
var postLabel;
pagecurrentg();
function looppagecurrentg(f)
	{
	var d="";
	pageNumber=parseInt(numPages/2);
	if(pageNumber==numPages-pageNumber)
		{
		numPages=pageNumber*2+1
	}
	pageStart=currentPageNo-pageNumber;
	if(pageStart<1)
		{
		pageStart=1
	}
	lastPageNo=parseInt(f/perPage)+1;
	if(lastPageNo-1==f/perPage)
		{
		lastPageNo=lastPageNo-1
	}
	pageEnd=pageStart+numPages-1;
	if(pageEnd>lastPageNo)
		{
		pageEnd=lastPageNo
	}
	d+="<span class='showpageOf'>Page "+currentPageNo+" of "+lastPageNo+"</span>";
	var e=parseInt(currentPageNo)-1;
	if(currentPageNo>1)
		{
		if(currentPage=="page")
			{
			d+='<span class="showpage firstpage"><a href="'+home_page+'">'+firstText+"</a></span>"
		}
		else
			{
			d+='<span class="displaypageNum firstpage"><a href="/search/label/'+postLabel+"?&max-results="+perPage+'">'+firstText+"</a></span>"
		}
	}
	if(currentPageNo>2)
		{
		if(currentPageNo==3)
			{
			if(currentPage=="page")
				{
				d+='<span class="showpage"><a href="'+home_page+'">'+prevText+"</a></span>"
			}
			else
				{
				d+='<span class="displaypageNum"><a href="/search/label/'+postLabel+"?&max-results="+perPage+'">'+prevText+"</a></span>"
			}
		}
		else
			{
			if(currentPage=="page")
				{
				d+='<span class="displaypageNum"><a href="#" onclick="redirectpage('+e+');
				return false">'+prevText+"</a></span>"
			}
			else
				{
				d+='<span class="displaypageNum"><a href="#" onclick="redirectlabel('+e+');
				return false">'+prevText+"</a></span>"
			}
		}
	}
	if(pageStart>1)
		{
		if(currentPage=="page")
			{
			d+='<span class="displaypageNum"><a href="'+home_page+'">1</a></span>'
		}
		else
			{
			d+='<span class="displaypageNum"><a href="/search/label/'+postLabel+"?&max-results="+perPage+'">1</a></span>'
		}
	}
	if(pageStart>2)
		{
		d+=" ... "
	}
	for(var g=pageStart;
	g<=pageEnd;
	g++)
		{
		if(currentPageNo==g)
			{
			d+='<span class="pagecurrent">'+g+"</span>"
		}
		else
			{
			if(g==1)
				{
				if(currentPage=="page")
					{
					d+='<span class="displaypageNum"><a href="'+home_page+'">1</a></span>'
				}
				else
					{
					d+='<span class="displaypageNum"><a href="/search/label/'+postLabel+"?&max-results="+perPage+'">1</a></span>'
				}
			}
			else
				{
				if(currentPage=="page")
					{
					d+='<span class="displaypageNum"><a href="#" onclick="redirectpage('+g+');
					return false">'+g+"</a></span>"
				}
				else
					{
					d+='<span class="displaypageNum"><a href="#" onclick="redirectlabel('+g+');
					return false">'+g+"</a></span>"
				}
			}
		}
	}
	if(pageEnd<lastPageNo-1)
		{
		d+=" ... "
	}
	if(pageEnd<lastPageNo)
		{
		if(currentPage=="page")
			{
			d+='<span class="displaypageNum"><a href="#" onclick="redirectpage('+lastPageNo+');
			return false">'+lastPageNo+"</a></span>"
		}
		else
			{
			d+='<span class="displaypageNum"><a href="#" onclick="redirectlabel('+lastPageNo+');
			return false">'+lastPageNo+"</a></span>"
		}
	}
	var a=parseInt(currentPageNo)+1;
	if(currentPageNo<(lastPageNo-1))
		{
		if(currentPage=="page")
			{
			d+='<span class="displaypageNum"><a href="#" onclick="redirectpage('+a+');
			return false">'+nextText+"</a></span>"
		}
		else
			{
			d+='<span class="displaypageNum"><a href="#" onclick="redirectlabel('+a+');
			return false">'+nextText+"</a></span>"
		}
	}
	if(currentPageNo<lastPageNo)
		{
		if(currentPage=="page")
			{
			d+='<span class="displaypageNum lastpage"><a href="#" onclick="redirectpage('+lastPageNo+');
			return false">'+lastText+"</a></span>"
		}
		else
			{
			d+='<span class="displaypageNum lastpage"><a href="#" onclick="redirectlabel('+lastPageNo+');
			return false">'+lastText+"</a></span>"
		}
	}
	var c=document.getElementsByName("pageArea");
	var b=document.getElementById("blog-pager");
	for(var h=0;
	h<c.length;
	h++)
		{
		c[h].innerHTML=d
	}
	if(c&&c.length>0)
		{
		d=""
	}
	if(b)
		{
		b.innerHTML=d
	}
}
function totalcountdata(a)
	{
	var c=a.feed;
	var b=parseInt(c.openSearch$totalResults.$t,10);
	looppagecurrentg(b)
}
function pagecurrentg()
	{
	var a=urlactivepage;
	if(a.indexOf("/search/label/")!=-1)
		{
		if(a.indexOf("?updated-max")!=-1)
			{
			postLabel=a.substring(a.indexOf("/search/label/")+14,a.indexOf("?updated-max"))
		}
		else
			{
			postLabel=a.substring(a.indexOf("/search/label/")+14,a.indexOf("?&max"))
		}
	}
	if(a.indexOf("?q=")==-1&&a.indexOf(".html")==-1)
		{
		if(a.indexOf("/search/label/")==-1)
			{
			currentPage="page";
			if(urlactivepage.indexOf("#PageNo=")!=-1)
				{
				currentPageNo=urlactivepage.substring(urlactivepage.indexOf("#PageNo=")+8,urlactivepage.length)
			}
			else
				{
				currentPageNo=1
			}
			document.write('<script src="'+home_page+'feeds/posts/summary?max-results=1&alt=json-in-script&callback=totalcountdata"><\/script>')
		}
		else
			{
			currentPage="label";
			if(a.indexOf("&max-results=")==-1)
				{
				perPage=20
			}
			if(urlactivepage.indexOf("#PageNo=")!=-1)
				{
				currentPageNo=urlactivepage.substring(urlactivepage.indexOf("#PageNo=")+8,urlactivepage.length)
			}
			else
				{
				currentPageNo=1
			}
			document.write('<script src="'+home_page+"feeds/posts/summary/-/"+postLabel+'?alt=json-in-script&callback=totalcountdata&max-results=1" ><\/script>')
		}
	}
}
function redirectpage(a)
	{
	jsonstart=(a-1)*perPage;
	noPage=a;
	var b=document.getElementsByTagName("head")[0];
	var c=document.createElement("script");
	c.type="text/javascript";
	c.setAttribute("src",home_page+"feeds/posts/summary?start-index="+jsonstart+"&max-results=1&alt=json-in-script&callback=finddatepost");
	b.appendChild(c)
}
function redirectlabel(a)
	{
	jsonstart=(a-1)*perPage;
	noPage=a;
	var b=document.getElementsByTagName("head")[0];
	var c=document.createElement("script");
	c.type="text/javascript";
	c.setAttribute("src",home_page+"feeds/posts/summary/-/"+postLabel+"?start-index="+jsonstart+"&max-results=1&alt=json-in-script&callback=finddatepost");
	b.appendChild(c)
}
function finddatepost(c)
	{
	post=c.feed.entry[0];
	var a=post.published.$t.substring(0,19)+post.published.$t.substring(23,29);
	var d=encodeURIComponent(a);
	if(currentPage=="page")
		{
		var b="/search?updated-max="+d+"&max-results="+perPage+"#PageNo="+noPage
	}
	else
		{
		var b="/search/label/"+postLabel+"?updated-max="+d+"&max-results="+perPage+"#PageNo="+noPage
	}
	location.href=b
};
$(document).ready(function()
	{
	$(".owl_carouselle").owlCarousel(
		{
		autoplay:true,loop:true,lazyLoad:true,autoplayHoverPause:true,smartSpeed:1200,responsiveClass:true,navText:['<i class="fa fa-chevron-left" aria-hidden="true"></i>','<i class="fa fa-chevron-right" aria-hidden="true"></i>'],nav:true,responsive:
			{
			0:
				{
				items:2
			}
			,600:
				{
				items:3
			}
			,1e3:
				{
				items:6
			}
		}
	}
	);
	$("a.g-profile,cite.user a,a.timestamp-link").removeAttr("href");
	$('#relatedpost ul li .rel-img img').each(function()
		{
		$(this).attr('src',$(this).attr('src').replace('s72-c','w145-h110-c'))
	}
	);
	$('#PopularPosts1 ul li:first-child .item-thumbnail img').each(function()
		{
		$(this).attr('src',$(this).attr('src').replace('w80-h80-p-k-no-nu','w347-h140-c'))
	}
	);
	$("#PopularPosts1 ul li:nth-child(1n+2)").each(function()
		{
		var c=$(this),b=c.find(".item-title a"),a=b.attr("href");
		$.ajax(
			{
			url:a,type:"get",success:function(f)
				{
				var d=$(f).find(".published").text(),e=$(f).find(".comment-if a").text();
				b.parent().after('<div class="item-meta"><span class="item-date">'+d+'</span><span class="item-cmm">'+e+"</span></div>")
			}
		}
		)
	}
	);
	jQuery(document).ready(function(d)
		{
		var m=$("#BackToTop");
		var xx=$(".itop");
		$(window).scroll(function()
			{
			$(this).scrollTop()>=200?m.show(10).animate(
				{
				right:"15px"
			}
			,30):m.animate(
				{
				right:"-96px"
			}
			,30)
		}
		);
		xx.click(function(n)
			{
			n.preventDefault();
			$("html,body").animate(
				{
				scrollTop:0
			}
			,400)
		}
		)
	}
	)
}
);
$(()=>
	{
	const theme='dark';
	const darkMode=localStorage.getItem(theme);
	$('html').toggleClass(theme,darkMode==='true');
	$('#'+theme).prop('checked',darkMode==='true').click(function()
		{
		$("html").toggleClass(theme,$(this).is(':checked'));
		localStorage.setItem(theme,String($(this).is(':checked')))
	}
	)
}
);
function showLucky(root)
	{
	var feed=root.feed;
	var entries=feed.entry||[];
	var entry=feed.entry[0];
	for(var j=0;
	j<entry.link.length;
	++j)
		{
		if(entry.link[j].rel=='alternate')
			{
			window.location=entry.link[j].href
		}
	}
}
function fetchLuck(luck)
	{
	script=document.createElement('script');
	script.src='/feeds/posts/summary?start-index='+luck+'&max-results=1&alt=json-in-script&callback=showLucky';
	script.type='text/javascript';
	document.getElementsByTagName('head')[0].appendChild(script)
}
function feelingLucky(root)
	{
	var feed=root.feed;
	var total=parseInt(feed.openSearch$totalResults.$t,10);
	var luckyNumber=Math.floor(Math.random()*total);
	luckyNumber++;
	a=document.createElement('a');
	a.href='#random';
	a.rel=luckyNumber;
	a.onclick=function()
		{
		fetchLuck(this.rel)
	};
	a.innerHTML='<span class="fa fa-star-o"></span> Surprise Me!';
	document.getElementById('btt-random').appendChild(a)
};
$(document).ready(function()
	{
	function redirect()
		{
		window.location.assign('https://www.animepisodelengkap.my.id')
	}
	function check()
		{
		if($('html').length===0)
			{
			redirect()
		}
		else if($('body').length===0)
			{
			redirect()
		}
		if($('footer').length===0)
			{
			redirect()
		}
		else if($('credit').length===0)
			{
			redirect()
		}
		else if($("#xc").attr("href")!=="https://www.animepisodelengkap.my.id")
			{
			redirect()
		}
		else if($('#xc').text()!=="Arlethdesign")
			{
			redirect()
		}
	}
	check();
	setInterval(function()
		{
		check()
	}
	,5000)
}
);
