angular.module('starter.services', [])
.service("BaseService",function($http){

  this.loadMore=function($this){
    console.log('正在加载更多数据...'+$this.page);
    $http.get($this.url+'?page='+$this.page)
    .success(function(response){
      if(response.data.length==0){
        console.log("没有数据来了，谢谢");
        $this.isload=true;
      }else{
        $this.items=$this.items.concat(response.data);
        $this.page++;


      }
      $this.callback();

    })
  }
  this.doRefresh=function($this){
    console.log("正在执行refresh操作...");
    $http.get($this.url+"?page="+$this.page)
    .success(function(response){
      $this.page=2;
      $this.items=response.data;
      $this.callback();
      $this.isload=false;

    })
  }




})
// .factory('Chats', function() {
//   // Might use a resource here that returns a JSON array

//   // Some fake testing data
//   var chats = [{
//     id: 0,
//     name: 'Ben Sparrow',
//     lastText: 'You on your way?',
//     face: 'img/ben.png'
//   }, {
//     id: 1,
//     name: 'Max Lynx',
//     lastText: 'Hey, it\'s me',
//     face: 'img/max.png'
//   }, {
//     id: 2,
//     name: 'Adam Bradleyson',
//     lastText: 'I should buy a boat',
//     face: 'img/adam.jpg'
//   }, {
//     id: 3,
//     name: 'Perry Governor',
//     lastText: 'Look at my mukluks!',
//     face: 'img/perry.png'
//   }, {
//     id: 4,
//     name: 'Mike Harrington',
//     lastText: 'This is wicked good ice cream.',
//     face: 'img/mike.png'
//   }];

//   return {
//     all: function() {
//       return chats;
//     },
//     remove: function(chat) {
//       chats.splice(chats.indexOf(chat), 1);
//     },
//     get: function(chatId) {
//       for (var i = 0; i < chats.length; i++) {
//         if (chats[i].id === parseInt(chatId)) {
//           return chats[i];
//         }
//       }
//       return null;
//     }
//   };
// })
.service("Tab1Service",function(BaseService,$http){
  this.getDetails=function(id){
    return $http.get(urls.show+id);
  }

  this.getJson=function(){
    $http.jsonp(domain+'json').success(function(data){
      console.log(data);
    })
  }



  this.getTab1Menu=function(){
    return [
      {
        name:'国际新闻',
        isload:true,
        url:domain+'info/list',
        type:'xue',
        page:1,
        items:[],
        loadMore:function(){
          // console.log($this);
          BaseService.loadMore(this);
        },
        doRefresh:function(){
          BaseService.doRefresh(this);
        },
        callback:function(){

        }
      },
      {
        name:'国内新闻',
        isload:true,
        url:domain+'info/list',
        type:'jun',
        page:1,
        items:[],
        loadMore:function(){
          // console.log($this);
          BaseService.loadMore(this);
        },
        doRefresh:function(){
          BaseService.doRefresh(this);
        },
        callback:function(){

        }
      },
    ]
  }
})

.service('Tab2Service',function(BaseService,$http){

  this.getDetails=function(id){
    return $http.get(urls.show+id);
  }
  this.getTab2Menu=function(){
    return [
      {
        name:'娱乐八卦',
        isload:true,
        url:domain+'info/list',
        type:'xue',
        page:1,
        items:[],
        loadMore:function(){
          // console.log($this);
          BaseService.loadMore(this);
        },
        doRefresh:function(){
          BaseService.doRefresh(this);
        },
        callback:function(){

        }
      },
      {
        name:'时尚资讯',
        isload:true,
        url:domain+'info/list',
        type:'jun',
        page:1,
        items:[],
        loadMore:function(){
          // console.log($this);
          BaseService.loadMore(this);
        },
        doRefresh:function(){
          BaseService.doRefresh(this);
        },
        callback:function(){

        }
      },
    ]
  }
})
.service('Tab3Service',function(BaseService,$http){
  this.getDetails=function(id){
    return $http.get(urls.show+id);
  }
  this.getTab3Menu=function(){
    return [
      {
        name:'铁血军事',
        isload:true,
        url:domain+'info/list',
        type:'xue',
        page:1,
        items:[],
        loadMore:function(){
          // console.log($this);
          BaseService.loadMore(this);
        },
        doRefresh:function(){
          BaseService.doRefresh(this);
        },
        callback:function(){

        }
      },
      {
        name:'军事',
        isload:true,
        url:domain+'info/list',
        type:'jun',
        page:1,
        items:[],
        loadMore:function(){
          // console.log($this);
          BaseService.loadMore(this);
        },
        doRefresh:function(){
          BaseService.doRefresh(this);
        },
        callback:function(){

        }
      },
    ]
  }
})
.service('Tab4Service',function(BaseService,$http){
  this.getDetails=function(id){
    return $http.get(urls.show+id);
  }
  this.getTab4Menu=function(){
    return [
      {
        name:'体坛资讯',
        isload:true,
        url:domain+'info/list',
        type:'xue',
        page:1,
        items:[],
        loadMore:function(){
          // console.log($this);
          BaseService.loadMore(this);
        },
        doRefresh:function(){
          BaseService.doRefresh(this);
        },
        callback:function(){

        }
      },
      {
        name:'体坛明星',
        isload:true,
        url:domain+'info/list',
        type:'jun',
        page:1,
        items:[],
        loadMore:function(){
          // console.log($this);
          BaseService.loadMore(this);
        },
        doRefresh:function(){
          BaseService.doRefresh(this);
        },
        callback:function(){

        }
      },
    ]
  }
})

.service('AccountService',function($http){
  var $this =this;
  // $http.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded";
  this.getCacheUser=function(){
    return angular.fromJson(window.localStorage[cache.user]);
  }
  this.login=function(username,password,callback){
    // var url=infos.login+'&name='+name+'&password='+password;
    $http.post(infos.login,{grant_type:settings.grant_type,
      client_id:settings.client_id,client_secret:settings.client_secret,
      username:username,password:password}).success(function(data){
      // console.log(data);
      if(data.status==false){
        alert('用户名和密码不匹配！');
      } else{
        
        window.localStorage[cache.token]=data.access_token;
        $this.user(callback);
      }

    })
  }
  this.user=function(callback){
    var url = infos.user+ "?access_token=" + window.localStorage[cache.token];
    $http.get(url).success(function(data){
      console.log(data);
    window.localStorage[cache.user]=angular.toJson(data);
    callback(data);
    })
  }
  this.reg=function(name,email,password){
    return $http.post(infos.reg,{name:name,email:email,password:password});
  }
})


.service('FavService',function($http){
  this.getFavourites=function(){

    return $http.get(infos.favourite+"?access_token="+window.localStorage[cache.token]);
  }

  this.addFav=function(id){
    return  $http.get(infos.favouriteAdd+"/"+id+"?access_token=" + window.localStorage[cache.token]);
 
  }
  this.deleteFav=function(id){
    return  $http.get(infos.favouriteDelete+"/"+id+"?access_token=" + window.localStorage[cache.token]);
  }
})
;
