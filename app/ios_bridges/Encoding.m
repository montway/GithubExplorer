#include "Encoding.h"
#include "RCTRootView.h"

@implementation Encoding

RCT_EXPORT_MODULE();

/**
 * @params base64Encode [NSString]
 *
 * Usage: import { Encoding } from 'NativeModules'; (es2015)
 * Usage: var encoding = require('NativeModules').Encoding; (es5)
 *
 */
RCT_EXPORT_METHOD(base64Encode:(NSString *)str callback:(RCTResponseSenderBlock)callback)
{
  NSData *nsdata = [str dataUsingEncoding:NSUTF8StringEncoding];
  NSString *base64Encoded = [nsdata base64EncodedStringWithOptions:0];

  callback(@[base64Encoded]);
}

@end