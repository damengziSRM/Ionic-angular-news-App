angular.module('starter.controllers', [])

.controller('AccountCtrl',function($scope,$window,$rootScope,$ionicPopup,$ionicLoading,$timeout,$ionicModal,$state,$ionicTabsDelegate,$ionicSlideBoxDelegate,AccountService){
  $rootScope.isLogin=false;
  $ionicModal.fromTemplateUrl('templates/tab-account-login.html',{
    scope:$scope,
    animation:'slide-in-up'
  }).then(function(modal){
    $scope.modal=modal;
  });
  $scope.loginData={
    username:'',
    password:''
  }
  $scope.regData={
    email:'',
    username:'',
    password:''
  }
  $scope.user={
    account:'未登录'
  }




  $scope.login=function(){
    AccountService.login($scope.loginData.username,$scope.loginData.password,function(user){
      $scope.user=user,
      $rootScope.isLogin=true;
      $scope.modal.hide();
      window.location.reload();
    })
  }
  $scope.register=function(){
    AccountService.reg($scope.regData.name,$scope.regData.email,$scope.regData.password).success(function(data){
      if(data.status==true){
        $ionicLoading.show({
          template:'注册成功',
          noBackdrop:true,
        })
        $timeout(function(){
          $ionicLoading.hide();
        },1000);
        $timeout(function(){
          accountSlide.slide(0);
        },2000);
      }
    })
  }
$scope.uData=AccountService.getCacheUser();
  
  $scope.doRefresh=function(){
    AccountService.user(function(result){
      if(result.status==false){
        $ionicPopup.alert({
          title:'提示',
          template:result.msg
        });
      }
      $scope.user =result;
      $scope.$broadcast('scroll.refreshComplete');
    })
  }



  $scope.goDetails=function(){
    if($rootScope.isLogin==false){
      $scope.modal.show();
    } else{
      $state.go('tab.account-details');
      $ionicTabsDelegate.showBar(false);
    }
  }

  $scope.$on('$ionicView.beforeEnter',function(){
    console.log('已经成为活动视图');
    var user= AccountService.getCacheUser();
    if(user==undefined){
      $rootScope.isLogin=false;
      $scope.user={}
    }else{
      if(user.status!=false){
        $rootScope.isLogin=true;
        $scope.user=user;
      }
    }
    $ionicTabsDelegate.showBar(true);
  })

  var accountSlide=$ionicSlideBoxDelegate.$getByHandle('accountSlide');
  var accountTab=$ionicTabsDelegate.$getByHandle('accountTab');

  $scope.AccountSlideChanged=function(index){
    // console.log(index);
    accountTab.select(accountSlide.currentIndex());

  }
  $scope.accountselectTab=function(index){
    accountSlide.slide(index);
  }
})
.controller('AccountDetailsCtrl',function($scope,$rootScope,$state,AccountService){
  $scope.logout=function(){
    console.log('logout');
    window.localStorage.removeItem(cache.user);
    window.localStorage.removeItem(cache.token);

    $rootScope.isLogin=false;
    $state.go('tab.account');
    // $ionicHistory.goBack();

  }
// console.log()
$scope.user=AccountService.getCacheUser();
$scope.doRefresh=function(){
  AccountService.user(function(user){
    $scope.user=user;
    $rootScope.isLogin=true;
    $scope.$broadcast('scroll.refreshComplete');
  })
}
})



.controller('BaseCtrl', function($scope,$rootScope,$ionicTabsDelegate,$ionicSlideBoxDelegate) {
  $rootScope.imgUrl=imgUrl;
  //slides group
  // $ionicSlideBoxDelegate.slide(0);
  //     $timeout(function(){
  //        $ionicSlideBoxDelegate.update(); 
  //       }, 500);
  $scope.slides=$scope.classify;
  $scope.tabs=$scope.classify;
  $scope.getData=function(c){
    if(ionic.Platform.isAndroid()){
      c.doRefresh();
    }
    c.isload=false;
    c.callback=function(){

    // c.isLock=false;
    $scope.$broadcast('scroll.refreshComplete');
    $scope.$broadcast('scroll.infiniteScrollComplete');
      
    }
  }

  //init first tab data
  $scope.getData($scope.classify[0]);
  var selectTab=function(index){
      $ionicTabsDelegate.$getByHandle($scope.currentTabId)
      .select(index);
     
  }
  $scope.slideChanged=function(index){
    var c=$scope.classify[index];
    $scope.getData(c);
    selectTab(index);
  };

  $scope.$on('$ionicView.afterEnter',function(){
    selectTab($ionicSlideBoxDelegate.$getByHandle($scope.currentSlide).currentIndex());
  });

  $scope.selectedTab=function(index){
    $ionicSlideBoxDelegate.slide(index);
  }

  $scope.$on('$ionicView.beforeEnter',function(){
    $ionicTabsDelegate.showBar(true);

  });

})

.controller('Tab1Ctrl', function($state,$scope,$controller,$ionicTabsDelegate,Tab1Service) {
  
  $scope.classify=Tab1Service.getTab1Menu();

  Tab1Service.getJson();

  $scope.currentTabId="tab1";
  $scope.currentSlide="slide1";
  $controller('BaseCtrl',{$scope:$scope});
  $scope.goDetails=function(item){
    
    $state.go('tab.tab1-details',{id:item.id,title:item.title});
    $ionicTabsDelegate.showBar(false);

  }


// $scope.goDetails=function(item){
//   $state.go("tab.tab1-details",{id:item.id,title:item.title},{reload:true});
//   $ionicTabsDelegate.showBar(false);

// }
// $scope.$on('$ionicView.beforeEnter',function(){
//   $ionicTabsDelegate.showBar(true);
// })



  // var page=1,isLock=false;
  // var hasmore=false;

  // $items=[];
  // $scope.loadMore=function(){
    
  //   if (isLock){
  //     return;
  //   }
  //   page++;
  //   isLock=true;
  //   Tab1Service.getList(classify[0].url+'?page='+page)
  //   .success(function(data){
  //     if(data.data.length==0){
  //       $scope.hasmore=true;
  //       // return;
  //     }
  //     // console.log(page);
  //     $scope.items=$scope.items.concat(data.data);
  //   }).finally(function(error){
  //     isLock=false;
  //     $scope.$broadcast('scroll.infiniteScrollComplete');
  //     $scope.$broadcast('scroll.refreshComplete');
  //   });
  // };
  // $scope.doRefresh=function(){
  //   page=1;
  //   $scope.items=[];
  //   $scope.loadMore();
  // }
  // $rootScope.imgUrl=imgUrl;
  
  // var classify=Tab1Service.getClassify();
  // $scope.slides=classify;
  // $scope.tabs=classify;

  // var slideIndex=0;

  // var getData=function(index){
  //   var c=classify[index];
  //   // if(isLock){
  //   //   return;
  //   // }
  //   // isLock=true;
  //   if(ionic.Platform.isAndroid()){
  //     c.doRefresh();
  //   }
  //   if(index!=0){
  //     c.doRefresh();
  //   }
    
  //   c.isload=false;
  //   c.callback=function(){

  //     // c.isLock=false;
  //     $scope.$broadcast('scroll.infiniteScrollComplete');
  //     $scope.$broadcast('scroll.refreshComplete');
  //   }
  // }
  // getData(0);
  // Tab1Service.getList(classify[0].url,1)
  // .then(function(response){
  //     if(response.status){
  //       $scope.items=response.data.data;
  //       console.log(response.data);
  //     }
  // },function(error){
  //     console.log(error);
  // });


  // $scope.slideChanged=function(index){
  //   getData(index);
  //   $ionicTabsDelegate._instances[1].select(index)
  // };
  // $scope.$on('$ionicView.afterEnter',function(){
  //   $ionicTabsDelegate._instances[1].select($ionicSlideBoxDelegate.currentIndex());
  // });
  // $scope.selectedTab=function(index){
  //  $ionicSlideBoxDelegate.slide(index); 
  // }
})

.controller('Tab1DetailsCtrl', function($scope,$timeout,$stateParams,$ionicLoading,$ionicPopover,$ionicActionSheet,Tab1Service,AccountService,FavService) {
  $scope.favorite=function(){
    var user = AccountService.getCacheUser();
    if( user == undefined){
      $ionicLoading.show({
        template:'请登录！',
        noBackdrop:true
      })
    } else{
        var hideSheet = $ionicActionSheet.show({
          buttons:[
            {text:'收藏'}

          ],
          titleText:'加入收藏夹',
          cancelText:'取消',
          cancel:function(){

          },
          buttonClicked:function(index){
            FavService.addFav(id).success(function(data){
              if(data.status==true){
                $ionicLoading.show({
                  template:'收藏成功',
                  noBackdrop:true
                })
              }else{
                $ionicLoading.show({
                  template:'收藏失败',
                  noBackdrop:true
                })
              }
              $timeout(function(){
                $ionicLoading.hide();
              },1000)
            });
            return true;
          }
        })
    }
    
    $timeout(function(){
        $ionicLoading.hide();
      },1000);
  
    return ;
  }
    
  var id=$stateParams.id;
  // var type=$stateParams.type;
  $scope.title=$stateParams.title;
  
  Tab1Service.getDetails(id)
  .success(function(response){
    $scope.item=response.data;
  })
})
.controller('Tab2Ctrl', function($scope,$state,$controller,$ionicTabsDelegate,Tab2Service) {
  $scope.classify=Tab2Service.getTab2Menu();
  $scope.currentTabId="tab1";
  $scope.currentSlide="slide1";
  $controller('BaseCtrl',{$scope:$scope});
  $scope.goDetails=function(item){
    
    $state.go('tab.tab2-details',{id:item.id,title:item.title});
    $ionicTabsDelegate.showBar(false);
  }

})
.controller('Tab2DetailsCtrl', function($scope,$stateParams,$ionicLoading,$ionicPopover,$ionicActionSheet,Tab2Service) {
  var id=$stateParams.id;
  $scope.title=$stateParams.title;
  Tab2Service.getDetails(id)
  .success(function(response){
    $scope.item=response.data;
  })
})
.controller('Tab3Ctrl', function($scope,$controller,$state,$ionicTabsDelegate,Tab3Service) {
  $scope.classify=Tab3Service.getTab3Menu();
  $scope.currentTabId="tab3";
  $scope.currentSlide="slide1";
  $controller('BaseCtrl',{$scope:$scope});
  $scope.goDetails=function(item){
    
    $state.go('tab.tab3-details',{id:item.id,title:item.title});
    $ionicTabsDelegate.showBar(false);

  }
})
.controller('Tab3DetailsCtrl', function($scope,$stateParams,$ionicLoading,$ionicPopover,$ionicActionSheet,Tab3Service) {
  var id=$stateParams.id;
  $scope.title=$stateParams.title;
  Tab3Service.getDetails(id)
  .success(function(response){
    $scope.item=response.data;
  })
})
.controller('Tab4Ctrl', function($scope,$controller,$state,$ionicTabsDelegate,Tab4Service) {
  $scope.classify=Tab4Service.getTab4Menu();
  $scope.currentTabId="tab1";
  $scope.currentSlide="slide1";
  $controller('BaseCtrl',{$scope:$scope});
  $scope.goDetails=function(item){
    
    $state.go('tab.tab4-details',{id:item.id,title:item.title});
    $ionicTabsDelegate.showBar(false);

  }
})
.controller('Tab4DetailsCtrl', function($scope,$stateParams,$ionicLoading,$ionicPopover,$ionicActionSheet,Tab4Service) {
  var id=$stateParams.id;
  $scope.title=$stateParams.title;
  Tab4Service.getDetails(id)
  .success(function(response){
    $scope.item=response.data;
  })
})

.controller('FavCtrl',function($scope,FavService,$state,$ionicLoading,$ionicListDelegate,$timeout){
  $scope.shouldShowDelete=false;
  $scope.shouldShowReorder=false;
  $scope.listCanSwipe=true;
  FavService.getFavourites().success(function(data){
    $scope.items=data.data;
  })

  // var vm=$scope.vm={
  //   rows:1,
  //   isload:false,
  //   items:[],
  //   load:function(){
  //     FavService.getFavorites()
  //     .success(function(response){
  //       if(response.data.length==0){
  //         vm.isload=true;

  //       }else{
  //         vm.row +=1;
  //         vm.items = vm.items.concat(response.data);
  //       }
  //     }).finally(function(){
  //       $scope.$broadcast('scroll.refreshComplete');
  //       $scope.$broadcast('scroll.infiniteScrollComplete');
  //     })
  //   },
  //   doRefresh:function(){
  //     vm.items = [];
  //     vm.row = 1;
  //     vm.load();
  //   },
  //   loadMore:function(){
  //     vm.load;
  //   }
  // }
  $scope.goDetails=function(item){
    $state.go('tab.account',{id:item.id,title:item.title});
  }
  $scope.removeItem=function(item){
    FavService.deleteFav(item.id).success(function(data){
      if(data.status==true){
        $scope.items.splice($scope.items.indexOf(item),1);
        $ionicListDelegate.closeOptionButtons();
        $ionicLoading.show({
          template:'已删除',
          noBackdrop:true
        })
      } else{
        $ionicLoading.show({
          template:'删除失败',
          noBackdrop:true
        })
      }
      $timeout(function(){
        $ionicLoading.hide();
      },1000)
    })
  }

})

;
