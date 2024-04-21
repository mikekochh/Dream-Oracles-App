// #import "AppDelegate.h"
//
// #import <React/RCTBundleURLProvider.h>
// #import "RNSplashScreen.h"
//// #import <React/RCTAppSetupUtils.h>
//
// @implementation AppDelegate
//
// - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
// {
//   self.moduleName = @"DreamOraclesApp";
//   // You can add your custom initial props in the dictionary below.
//   // They will be passed down to the ViewController used by React Native.
//   self.initialProps = @{};
//  
//   [RNSplashScreen show];  // here
//   // or
////   [RNSplashScreen showSplash:@"LaunchScreen" inRootView:rootView];
//
//   return YES;
// }
//
// - (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
// {
//   return [self getBundleURL];
// }
//
// - (NSURL *)getBundleURL
// {
// #if DEBUG
//   return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
// #else
//   return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
// #endif
// }
//
// @end

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "RNSplashScreen.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"DreamOraclesApp";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  
  BOOL enableFlipper = false;
  
  // Load the RCTRootView
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:self.moduleName
                                            initialProperties:self.initialProps];

  if (@available(iOS 13.0, *)) {
      rootView.backgroundColor = [UIColor systemBackgroundColor];
  } else {
      rootView.backgroundColor = [UIColor whiteColor];
  }

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];

  // Show the splash screen
  [RNSplashScreen show];

  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
