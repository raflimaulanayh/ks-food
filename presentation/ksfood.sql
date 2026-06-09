-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 24, 2026 at 04:24 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ksfood`
--

-- --------------------------------------------------------

--
-- Table structure for table `ms_address`
--

CREATE TABLE `ms_address` (
  `addressId` varchar(20) NOT NULL,
  `customerId` varchar(20) NOT NULL,
  `label` varchar(50) NOT NULL,
  `fullAddress` text NOT NULL,
  `city` varchar(50) NOT NULL,
  `province` varchar(50) NOT NULL,
  `postalCode` varchar(10) NOT NULL,
  `latitude` varchar(50) DEFAULT NULL,
  `longitude` varchar(50) DEFAULT NULL,
  `isPrimary` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ms_category`
--

CREATE TABLE `ms_category` (
  `categoryId` varchar(15) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ms_corporate`
--

CREATE TABLE `ms_corporate` (
  `corporateId` varchar(20) NOT NULL,
  `customerId` varchar(20) NOT NULL,
  `companyName` varchar(100) NOT NULL,
  `taxIdentificationNumber` varchar(50) NOT NULL,
  `personInChargeName` varchar(100) NOT NULL,
  `personInChargePhone` varchar(15) NOT NULL,
  `creditLimit` decimal(12,2) NOT NULL DEFAULT 0.00,
  `paymentTermDays` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ms_customer`
--

CREATE TABLE `ms_customer` (
  `customerId` varchar(20) NOT NULL,
  `userId` varchar(20) NOT NULL,
  `fullName` varchar(100) NOT NULL,
  `type` enum('CORPORATE','RETAIL') NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ms_department`
--

CREATE TABLE `ms_department` (
  `departmentId` varchar(15) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ms_employee`
--

CREATE TABLE `ms_employee` (
  `employeeId` varchar(20) NOT NULL,
  `userId` varchar(20) NOT NULL,
  `departmentId` varchar(15) NOT NULL,
  `positionId` varchar(15) NOT NULL,
  `identificationNumber` varchar(20) NOT NULL,
  `fullName` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ms_expedition`
--

CREATE TABLE `ms_expedition` (
  `expeditionId` varchar(15) NOT NULL,
  `name` varchar(50) NOT NULL,
  `serviceType` varchar(30) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ms_material`
--

CREATE TABLE `ms_material` (
  `materialId` varchar(20) NOT NULL,
  `materialCode` varchar(30) NOT NULL,
  `name` varchar(100) NOT NULL,
  `unitOfMeasurement` varchar(20) NOT NULL,
  `minimumStockAlert` int(11) NOT NULL DEFAULT 0,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ms_packaging`
--

CREATE TABLE `ms_packaging` (
  `packagingId` varchar(15) NOT NULL,
  `name` varchar(50) NOT NULL,
  `materialType` varchar(30) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ms_payment_method`
--

CREATE TABLE `ms_payment_method` (
  `paymentMethodId` varchar(15) NOT NULL,
  `name` varchar(50) NOT NULL,
  `provider` varchar(50) NOT NULL,
  `accountNumber` varchar(50) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ms_position`
--

CREATE TABLE `ms_position` (
  `positionId` varchar(15) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ms_product`
--

CREATE TABLE `ms_product` (
  `productId` varchar(20) NOT NULL,
  `categoryId` varchar(15) NOT NULL,
  `packagingId` varchar(15) NOT NULL,
  `stockKeepingUnit` varchar(30) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `basePrice` decimal(10,2) NOT NULL,
  `unitOfMeasurement` varchar(20) NOT NULL,
  `weightInGrams` int(11) NOT NULL,
  `cachedTotalStock` int(11) NOT NULL DEFAULT 0,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ms_promotion`
--

CREATE TABLE `ms_promotion` (
  `promotionId` varchar(20) NOT NULL,
  `code` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `type` enum('DISCOUNT_PERCENTAGE','DISCOUNT_NOMINAL','FREE_SHIPPING') NOT NULL,
  `discountValue` decimal(10,2) NOT NULL,
  `minimumPurchase` decimal(12,2) NOT NULL DEFAULT 0.00,
  `maximumDiscount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `usageQuota` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ms_purchase_agreement`
--

CREATE TABLE `ms_purchase_agreement` (
  `agreementId` varchar(20) NOT NULL,
  `corporateId` varchar(20) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `status` enum('DRAFT','ACTIVE','EXPIRED','TERMINATED') NOT NULL DEFAULT 'DRAFT',
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ms_purchase_agreement_item`
--

CREATE TABLE `ms_purchase_agreement_item` (
  `agreementItemId` varchar(25) NOT NULL,
  `agreementId` varchar(20) NOT NULL,
  `productId` varchar(20) NOT NULL,
  `negotiatedPrice` decimal(10,2) NOT NULL,
  `minimumOrderQuantity` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ms_retail`
--

CREATE TABLE `ms_retail` (
  `retailId` varchar(20) NOT NULL,
  `customerId` varchar(20) NOT NULL,
  `loyaltyPoint` int(11) NOT NULL DEFAULT 0,
  `birthDate` date DEFAULT NULL,
  `gender` enum('MALE','FEMALE','OTHER') DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ms_role`
--

CREATE TABLE `ms_role` (
  `roleId` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ms_sales_channel`
--

CREATE TABLE `ms_sales_channel` (
  `channelId` varchar(15) NOT NULL,
  `name` varchar(50) NOT NULL,
  `platformFeePercentage` decimal(5,2) NOT NULL DEFAULT 0.00,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ms_setting`
--

CREATE TABLE `ms_setting` (
  `settingId` int(11) NOT NULL,
  `settingKey` varchar(50) NOT NULL,
  `settingValue` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ms_supplier`
--

CREATE TABLE `ms_supplier` (
  `supplierId` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `contactName` varchar(100) NOT NULL,
  `contactPhone` varchar(15) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ms_tax`
--

CREATE TABLE `ms_tax` (
  `taxId` varchar(15) NOT NULL,
  `name` varchar(50) NOT NULL,
  `ratePercentage` decimal(5,2) NOT NULL DEFAULT 0.00,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ms_user`
--

CREATE TABLE `ms_user` (
  `userId` varchar(20) NOT NULL,
  `roleId` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phoneNumber` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  `lastLoginDate` datetime DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ms_warehouse`
--

CREATE TABLE `ms_warehouse` (
  `warehouseId` varchar(15) NOT NULL,
  `name` varchar(50) NOT NULL,
  `address` text NOT NULL,
  `capacity` int(11) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tr_cart`
--

CREATE TABLE `tr_cart` (
  `cartId` varchar(25) NOT NULL,
  `customerId` varchar(20) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tr_cart_item`
--

CREATE TABLE `tr_cart_item` (
  `cartItemId` varchar(25) NOT NULL,
  `cartId` varchar(25) NOT NULL,
  `productId` varchar(20) NOT NULL,
  `quantity` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tr_material_batch`
--

CREATE TABLE `tr_material_batch` (
  `materialBatchId` varchar(25) NOT NULL,
  `materialId` varchar(20) NOT NULL,
  `warehouseId` varchar(15) NOT NULL,
  `batchNumber` varchar(50) NOT NULL,
  `quantity` decimal(10,2) NOT NULL DEFAULT 0.00,
  `productionDate` date NOT NULL,
  `expirationDate` date NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tr_notification`
--

CREATE TABLE `tr_notification` (
  `notificationId` varchar(25) NOT NULL,
  `userId` varchar(20) NOT NULL,
  `title` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `isRead` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tr_order`
--

CREATE TABLE `tr_order` (
  `orderId` varchar(25) NOT NULL,
  `customerId` varchar(20) NOT NULL,
  `addressId` varchar(20) NOT NULL,
  `taxId` varchar(15) NOT NULL,
  `channelId` varchar(15) NOT NULL,
  `agreementId` varchar(20) DEFAULT NULL,
  `orderDate` datetime NOT NULL DEFAULT current_timestamp(),
  `status` enum('PENDING_PAYMENT','PENDING_APPROVAL','PROCESSING','READY_TO_SHIP','SHIPPED','DELIVERED','COMPLETED','CANCELED','RETURNED') NOT NULL DEFAULT 'PENDING_PAYMENT',
  `clientPurchaseOrderNumber` varchar(50) DEFAULT NULL,
  `subtotalAmount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `shippingCost` decimal(10,2) NOT NULL DEFAULT 0.00,
  `discountAmount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `taxAmount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `grandTotalAmount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `refundAmount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `cancelReason` text DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tr_order_item`
--

CREATE TABLE `tr_order_item` (
  `orderItemId` varchar(25) NOT NULL,
  `orderId` varchar(25) NOT NULL,
  `productId` varchar(20) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `subtotalAmount` decimal(12,2) NOT NULL,
  `itemNotes` text DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tr_order_promo`
--

CREATE TABLE `tr_order_promo` (
  `orderPromoId` varchar(25) NOT NULL,
  `orderId` varchar(25) NOT NULL,
  `promotionId` varchar(20) NOT NULL,
  `discountAmount` decimal(10,2) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tr_payment`
--

CREATE TABLE `tr_payment` (
  `paymentId` varchar(25) NOT NULL,
  `orderId` varchar(25) NOT NULL,
  `paymentMethodId` varchar(15) NOT NULL,
  `paymentDate` datetime NOT NULL,
  `paidAmount` decimal(12,2) NOT NULL,
  `status` enum('PENDING','SUCCESS','FAILED','REFUNDED') NOT NULL DEFAULT 'PENDING',
  `referenceNumber` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tr_procurement`
--

CREATE TABLE `tr_procurement` (
  `procurementId` varchar(25) NOT NULL,
  `supplierId` varchar(20) NOT NULL,
  `purchaseOrderDate` date NOT NULL,
  `expectedArrivalDate` date DEFAULT NULL,
  `status` enum('DRAFT','SENT_TO_SUPPLIER','PARTIAL_RECEIVED','COMPLETED','CANCELED') NOT NULL DEFAULT 'DRAFT',
  `totalAmount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tr_procurement_item`
--

CREATE TABLE `tr_procurement_item` (
  `procurementItemId` varchar(25) NOT NULL,
  `procurementId` varchar(25) NOT NULL,
  `materialId` varchar(20) NOT NULL,
  `orderedQuantity` decimal(10,2) NOT NULL,
  `receivedQuantity` decimal(10,2) NOT NULL DEFAULT 0.00,
  `price` decimal(10,2) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tr_production_material_usage`
--

CREATE TABLE `tr_production_material_usage` (
  `materialUsageId` varchar(25) NOT NULL,
  `productionOrderId` varchar(25) NOT NULL,
  `materialBatchId` varchar(25) NOT NULL,
  `usedQuantity` decimal(10,2) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tr_production_order`
--

CREATE TABLE `tr_production_order` (
  `productionOrderId` varchar(25) NOT NULL,
  `employeeId` varchar(20) NOT NULL,
  `plannedDate` datetime NOT NULL,
  `actualDate` datetime DEFAULT NULL,
  `status` enum('PLANNED','IN_PROGRESS','QUALITY_CONTROL','COMPLETED','CANCELED') NOT NULL DEFAULT 'PLANNED',
  `qualityControlStatus` enum('PENDING','PASSED','FAILED') NOT NULL DEFAULT 'PENDING',
  `notes` text DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tr_production_result`
--

CREATE TABLE `tr_production_result` (
  `productionResultId` varchar(25) NOT NULL,
  `productionOrderId` varchar(25) NOT NULL,
  `productBatchId` varchar(25) NOT NULL,
  `producedQuantity` int(11) NOT NULL,
  `rejectedQuantity` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tr_product_batch`
--

CREATE TABLE `tr_product_batch` (
  `productBatchId` varchar(25) NOT NULL,
  `productId` varchar(20) NOT NULL,
  `warehouseId` varchar(15) NOT NULL,
  `batchNumber` varchar(50) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 0,
  `productionDate` date NOT NULL,
  `expirationDate` date NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tr_product_review`
--

CREATE TABLE `tr_product_review` (
  `reviewId` varchar(25) NOT NULL,
  `productId` varchar(20) NOT NULL,
  `customerId` varchar(20) NOT NULL,
  `orderId` varchar(25) NOT NULL,
  `rating` int(11) NOT NULL,
  `reviewComment` text DEFAULT NULL,
  `mediaUrl` text DEFAULT NULL,
  `isAnonymous` tinyint(1) NOT NULL DEFAULT 0,
  `adminReply` text DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tr_product_stock_movement`
--

CREATE TABLE `tr_product_stock_movement` (
  `movementId` varchar(25) NOT NULL,
  `productBatchId` varchar(25) NOT NULL,
  `warehouseId` varchar(15) NOT NULL,
  `movementType` enum('IN','OUT','ADJUSTMENT') NOT NULL,
  `quantity` int(11) NOT NULL,
  `referenceType` enum('PRODUCTION','ORDER','RETURN','OPNAME','MANUAL') NOT NULL,
  `referenceId` varchar(25) DEFAULT NULL,
  `movementDate` datetime NOT NULL DEFAULT current_timestamp(),
  `createdAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tr_return`
--

CREATE TABLE `tr_return` (
  `returnId` varchar(25) NOT NULL,
  `orderId` varchar(25) NOT NULL,
  `customerId` varchar(20) NOT NULL,
  `employeeId` varchar(20) DEFAULT NULL,
  `returnDate` datetime NOT NULL DEFAULT current_timestamp(),
  `status` enum('REQUESTED','REVIEWING','APPROVED','REJECTED','RECEIVED_IN_WAREHOUSE','RESOLVED') NOT NULL DEFAULT 'REQUESTED',
  `resolutionType` enum('REFUND_MONEY','PRODUCT_REPLACEMENT','STORE_CREDIT') DEFAULT NULL,
  `customerNotes` text DEFAULT NULL,
  `adminNotes` text DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tr_return_item`
--

CREATE TABLE `tr_return_item` (
  `returnItemId` varchar(25) NOT NULL,
  `returnId` varchar(25) NOT NULL,
  `orderItemId` varchar(25) NOT NULL,
  `returnedQuantity` int(11) NOT NULL,
  `returnReason` enum('DAMAGED_PACKAGING','EXPIRED','WRONG_ITEM','QUALITY_ISSUE') NOT NULL,
  `receivedCondition` enum('DEFECT','GOOD','EXPIRED','DESTROYED') DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tr_shipment`
--

CREATE TABLE `tr_shipment` (
  `shipmentId` varchar(25) NOT NULL,
  `orderId` varchar(25) NOT NULL,
  `expeditionId` varchar(15) NOT NULL,
  `airwayBillNumber` varchar(50) DEFAULT NULL,
  `status` enum('MANIFESTED','IN_TRANSIT','DELIVERED','RETURNED') NOT NULL DEFAULT 'MANIFESTED',
  `estimatedDeliveryDate` date DEFAULT NULL,
  `actualDeliveryDate` date DEFAULT NULL,
  `trackingUrl` text DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tr_stock_opname`
--

CREATE TABLE `tr_stock_opname` (
  `opnameId` varchar(25) NOT NULL,
  `warehouseId` varchar(15) NOT NULL,
  `employeeId` varchar(20) NOT NULL,
  `opnameDate` datetime NOT NULL DEFAULT current_timestamp(),
  `status` enum('DRAFT','REVIEWING','APPROVED','REJECTED') NOT NULL DEFAULT 'DRAFT',
  `notes` text DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tr_stock_opname_item`
--

CREATE TABLE `tr_stock_opname_item` (
  `opnameItemId` varchar(25) NOT NULL,
  `opnameId` varchar(25) NOT NULL,
  `productBatchId` varchar(25) NOT NULL,
  `systemQuantity` int(11) NOT NULL,
  `actualQuantity` int(11) NOT NULL,
  `differenceQuantity` int(11) NOT NULL,
  `reason` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ms_address`
--
ALTER TABLE `ms_address`
  ADD PRIMARY KEY (`addressId`),
  ADD KEY `customerId` (`customerId`);

--
-- Indexes for table `ms_category`
--
ALTER TABLE `ms_category`
  ADD PRIMARY KEY (`categoryId`);

--
-- Indexes for table `ms_corporate`
--
ALTER TABLE `ms_corporate`
  ADD PRIMARY KEY (`corporateId`),
  ADD UNIQUE KEY `uk_corp_cust` (`customerId`);

--
-- Indexes for table `ms_customer`
--
ALTER TABLE `ms_customer`
  ADD PRIMARY KEY (`customerId`),
  ADD UNIQUE KEY `uk_cust_user` (`userId`);

--
-- Indexes for table `ms_department`
--
ALTER TABLE `ms_department`
  ADD PRIMARY KEY (`departmentId`);

--
-- Indexes for table `ms_employee`
--
ALTER TABLE `ms_employee`
  ADD PRIMARY KEY (`employeeId`),
  ADD UNIQUE KEY `uk_emp_user` (`userId`),
  ADD KEY `departmentId` (`departmentId`),
  ADD KEY `positionId` (`positionId`);

--
-- Indexes for table `ms_expedition`
--
ALTER TABLE `ms_expedition`
  ADD PRIMARY KEY (`expeditionId`);

--
-- Indexes for table `ms_material`
--
ALTER TABLE `ms_material`
  ADD PRIMARY KEY (`materialId`);

--
-- Indexes for table `ms_packaging`
--
ALTER TABLE `ms_packaging`
  ADD PRIMARY KEY (`packagingId`);

--
-- Indexes for table `ms_payment_method`
--
ALTER TABLE `ms_payment_method`
  ADD PRIMARY KEY (`paymentMethodId`);

--
-- Indexes for table `ms_position`
--
ALTER TABLE `ms_position`
  ADD PRIMARY KEY (`positionId`);

--
-- Indexes for table `ms_product`
--
ALTER TABLE `ms_product`
  ADD PRIMARY KEY (`productId`),
  ADD UNIQUE KEY `uk_sku` (`stockKeepingUnit`),
  ADD KEY `categoryId` (`categoryId`),
  ADD KEY `packagingId` (`packagingId`);

--
-- Indexes for table `ms_promotion`
--
ALTER TABLE `ms_promotion`
  ADD PRIMARY KEY (`promotionId`),
  ADD UNIQUE KEY `uk_promo_code` (`code`);

--
-- Indexes for table `ms_purchase_agreement`
--
ALTER TABLE `ms_purchase_agreement`
  ADD PRIMARY KEY (`agreementId`),
  ADD KEY `corporateId` (`corporateId`);

--
-- Indexes for table `ms_purchase_agreement_item`
--
ALTER TABLE `ms_purchase_agreement_item`
  ADD PRIMARY KEY (`agreementItemId`),
  ADD KEY `agreementId` (`agreementId`),
  ADD KEY `fk_pa_item_product` (`productId`);

--
-- Indexes for table `ms_retail`
--
ALTER TABLE `ms_retail`
  ADD PRIMARY KEY (`retailId`),
  ADD UNIQUE KEY `uk_ret_cust` (`customerId`);

--
-- Indexes for table `ms_role`
--
ALTER TABLE `ms_role`
  ADD PRIMARY KEY (`roleId`);

--
-- Indexes for table `ms_sales_channel`
--
ALTER TABLE `ms_sales_channel`
  ADD PRIMARY KEY (`channelId`);

--
-- Indexes for table `ms_setting`
--
ALTER TABLE `ms_setting`
  ADD PRIMARY KEY (`settingId`),
  ADD UNIQUE KEY `uk_setting_key` (`settingKey`);

--
-- Indexes for table `ms_supplier`
--
ALTER TABLE `ms_supplier`
  ADD PRIMARY KEY (`supplierId`);

--
-- Indexes for table `ms_tax`
--
ALTER TABLE `ms_tax`
  ADD PRIMARY KEY (`taxId`);

--
-- Indexes for table `ms_user`
--
ALTER TABLE `ms_user`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `uk_username` (`username`),
  ADD UNIQUE KEY `uk_email` (`email`),
  ADD KEY `roleId` (`roleId`);

--
-- Indexes for table `ms_warehouse`
--
ALTER TABLE `ms_warehouse`
  ADD PRIMARY KEY (`warehouseId`);

--
-- Indexes for table `tr_cart`
--
ALTER TABLE `tr_cart`
  ADD PRIMARY KEY (`cartId`),
  ADD KEY `customerId` (`customerId`);

--
-- Indexes for table `tr_cart_item`
--
ALTER TABLE `tr_cart_item`
  ADD PRIMARY KEY (`cartItemId`),
  ADD KEY `cartId` (`cartId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `tr_material_batch`
--
ALTER TABLE `tr_material_batch`
  ADD PRIMARY KEY (`materialBatchId`),
  ADD KEY `materialId` (`materialId`),
  ADD KEY `warehouseId` (`warehouseId`);

--
-- Indexes for table `tr_notification`
--
ALTER TABLE `tr_notification`
  ADD PRIMARY KEY (`notificationId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `tr_order`
--
ALTER TABLE `tr_order`
  ADD PRIMARY KEY (`orderId`),
  ADD KEY `customerId` (`customerId`),
  ADD KEY `addressId` (`addressId`),
  ADD KEY `taxId` (`taxId`),
  ADD KEY `channelId` (`channelId`),
  ADD KEY `agreementId` (`agreementId`);

--
-- Indexes for table `tr_order_item`
--
ALTER TABLE `tr_order_item`
  ADD PRIMARY KEY (`orderItemId`),
  ADD KEY `orderId` (`orderId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `tr_order_promo`
--
ALTER TABLE `tr_order_promo`
  ADD PRIMARY KEY (`orderPromoId`),
  ADD KEY `orderId` (`orderId`),
  ADD KEY `promotionId` (`promotionId`);

--
-- Indexes for table `tr_payment`
--
ALTER TABLE `tr_payment`
  ADD PRIMARY KEY (`paymentId`),
  ADD KEY `orderId` (`orderId`),
  ADD KEY `paymentMethodId` (`paymentMethodId`);

--
-- Indexes for table `tr_procurement`
--
ALTER TABLE `tr_procurement`
  ADD PRIMARY KEY (`procurementId`),
  ADD KEY `supplierId` (`supplierId`);

--
-- Indexes for table `tr_procurement_item`
--
ALTER TABLE `tr_procurement_item`
  ADD PRIMARY KEY (`procurementItemId`),
  ADD KEY `procurementId` (`procurementId`),
  ADD KEY `materialId` (`materialId`);

--
-- Indexes for table `tr_production_material_usage`
--
ALTER TABLE `tr_production_material_usage`
  ADD PRIMARY KEY (`materialUsageId`),
  ADD KEY `productionOrderId` (`productionOrderId`),
  ADD KEY `materialBatchId` (`materialBatchId`);

--
-- Indexes for table `tr_production_order`
--
ALTER TABLE `tr_production_order`
  ADD PRIMARY KEY (`productionOrderId`),
  ADD KEY `employeeId` (`employeeId`);

--
-- Indexes for table `tr_production_result`
--
ALTER TABLE `tr_production_result`
  ADD PRIMARY KEY (`productionResultId`),
  ADD KEY `productionOrderId` (`productionOrderId`),
  ADD KEY `productBatchId` (`productBatchId`);

--
-- Indexes for table `tr_product_batch`
--
ALTER TABLE `tr_product_batch`
  ADD PRIMARY KEY (`productBatchId`),
  ADD KEY `productId` (`productId`),
  ADD KEY `warehouseId` (`warehouseId`);

--
-- Indexes for table `tr_product_review`
--
ALTER TABLE `tr_product_review`
  ADD PRIMARY KEY (`reviewId`),
  ADD KEY `productId` (`productId`),
  ADD KEY `customerId` (`customerId`),
  ADD KEY `orderId` (`orderId`);

--
-- Indexes for table `tr_product_stock_movement`
--
ALTER TABLE `tr_product_stock_movement`
  ADD PRIMARY KEY (`movementId`),
  ADD KEY `productBatchId` (`productBatchId`),
  ADD KEY `warehouseId` (`warehouseId`);

--
-- Indexes for table `tr_return`
--
ALTER TABLE `tr_return`
  ADD PRIMARY KEY (`returnId`),
  ADD KEY `orderId` (`orderId`),
  ADD KEY `customerId` (`customerId`),
  ADD KEY `employeeId` (`employeeId`);

--
-- Indexes for table `tr_return_item`
--
ALTER TABLE `tr_return_item`
  ADD PRIMARY KEY (`returnItemId`),
  ADD KEY `returnId` (`returnId`),
  ADD KEY `orderItemId` (`orderItemId`);

--
-- Indexes for table `tr_shipment`
--
ALTER TABLE `tr_shipment`
  ADD PRIMARY KEY (`shipmentId`),
  ADD KEY `orderId` (`orderId`),
  ADD KEY `expeditionId` (`expeditionId`);

--
-- Indexes for table `tr_stock_opname`
--
ALTER TABLE `tr_stock_opname`
  ADD PRIMARY KEY (`opnameId`),
  ADD KEY `warehouseId` (`warehouseId`),
  ADD KEY `employeeId` (`employeeId`);

--
-- Indexes for table `tr_stock_opname_item`
--
ALTER TABLE `tr_stock_opname_item`
  ADD PRIMARY KEY (`opnameItemId`),
  ADD KEY `opnameId` (`opnameId`),
  ADD KEY `productBatchId` (`productBatchId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ms_role`
--
ALTER TABLE `ms_role`
  MODIFY `roleId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ms_setting`
--
ALTER TABLE `ms_setting`
  MODIFY `settingId` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ms_address`
--
ALTER TABLE `ms_address`
  ADD CONSTRAINT `ms_address_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `ms_customer` (`customerId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ms_corporate`
--
ALTER TABLE `ms_corporate`
  ADD CONSTRAINT `ms_corporate_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `ms_customer` (`customerId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ms_customer`
--
ALTER TABLE `ms_customer`
  ADD CONSTRAINT `ms_customer_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `ms_user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ms_employee`
--
ALTER TABLE `ms_employee`
  ADD CONSTRAINT `ms_employee_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `ms_user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ms_employee_ibfk_2` FOREIGN KEY (`departmentId`) REFERENCES `ms_department` (`departmentId`) ON UPDATE CASCADE,
  ADD CONSTRAINT `ms_employee_ibfk_3` FOREIGN KEY (`positionId`) REFERENCES `ms_position` (`positionId`) ON UPDATE CASCADE;

--
-- Constraints for table `ms_product`
--
ALTER TABLE `ms_product`
  ADD CONSTRAINT `ms_product_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `ms_category` (`categoryId`) ON UPDATE CASCADE,
  ADD CONSTRAINT `ms_product_ibfk_2` FOREIGN KEY (`packagingId`) REFERENCES `ms_packaging` (`packagingId`) ON UPDATE CASCADE;

--
-- Constraints for table `ms_purchase_agreement`
--
ALTER TABLE `ms_purchase_agreement`
  ADD CONSTRAINT `ms_purchase_agreement_ibfk_1` FOREIGN KEY (`corporateId`) REFERENCES `ms_corporate` (`corporateId`) ON UPDATE CASCADE;

--
-- Constraints for table `ms_purchase_agreement_item`
--
ALTER TABLE `ms_purchase_agreement_item`
  ADD CONSTRAINT `fk_pa_item_product` FOREIGN KEY (`productId`) REFERENCES `ms_product` (`productId`) ON UPDATE CASCADE,
  ADD CONSTRAINT `ms_purchase_agreement_item_ibfk_1` FOREIGN KEY (`agreementId`) REFERENCES `ms_purchase_agreement` (`agreementId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ms_retail`
--
ALTER TABLE `ms_retail`
  ADD CONSTRAINT `ms_retail_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `ms_customer` (`customerId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ms_user`
--
ALTER TABLE `ms_user`
  ADD CONSTRAINT `ms_user_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `ms_role` (`roleId`) ON UPDATE CASCADE;

--
-- Constraints for table `tr_cart`
--
ALTER TABLE `tr_cart`
  ADD CONSTRAINT `tr_cart_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `ms_customer` (`customerId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tr_cart_item`
--
ALTER TABLE `tr_cart_item`
  ADD CONSTRAINT `tr_cart_item_ibfk_1` FOREIGN KEY (`cartId`) REFERENCES `tr_cart` (`cartId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tr_cart_item_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `ms_product` (`productId`) ON UPDATE CASCADE;

--
-- Constraints for table `tr_material_batch`
--
ALTER TABLE `tr_material_batch`
  ADD CONSTRAINT `tr_material_batch_ibfk_1` FOREIGN KEY (`materialId`) REFERENCES `ms_material` (`materialId`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tr_material_batch_ibfk_2` FOREIGN KEY (`warehouseId`) REFERENCES `ms_warehouse` (`warehouseId`) ON UPDATE CASCADE;

--
-- Constraints for table `tr_notification`
--
ALTER TABLE `tr_notification`
  ADD CONSTRAINT `tr_notification_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `ms_user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tr_order`
--
ALTER TABLE `tr_order`
  ADD CONSTRAINT `tr_order_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `ms_customer` (`customerId`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tr_order_ibfk_2` FOREIGN KEY (`addressId`) REFERENCES `ms_address` (`addressId`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tr_order_ibfk_3` FOREIGN KEY (`taxId`) REFERENCES `ms_tax` (`taxId`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tr_order_ibfk_4` FOREIGN KEY (`channelId`) REFERENCES `ms_sales_channel` (`channelId`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tr_order_ibfk_5` FOREIGN KEY (`agreementId`) REFERENCES `ms_purchase_agreement` (`agreementId`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `tr_order_item`
--
ALTER TABLE `tr_order_item`
  ADD CONSTRAINT `tr_order_item_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `tr_order` (`orderId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tr_order_item_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `ms_product` (`productId`) ON UPDATE CASCADE;

--
-- Constraints for table `tr_order_promo`
--
ALTER TABLE `tr_order_promo`
  ADD CONSTRAINT `tr_order_promo_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `tr_order` (`orderId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tr_order_promo_ibfk_2` FOREIGN KEY (`promotionId`) REFERENCES `ms_promotion` (`promotionId`) ON UPDATE CASCADE;

--
-- Constraints for table `tr_payment`
--
ALTER TABLE `tr_payment`
  ADD CONSTRAINT `tr_payment_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `tr_order` (`orderId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tr_payment_ibfk_2` FOREIGN KEY (`paymentMethodId`) REFERENCES `ms_payment_method` (`paymentMethodId`) ON UPDATE CASCADE;

--
-- Constraints for table `tr_procurement`
--
ALTER TABLE `tr_procurement`
  ADD CONSTRAINT `tr_procurement_ibfk_1` FOREIGN KEY (`supplierId`) REFERENCES `ms_supplier` (`supplierId`) ON UPDATE CASCADE;

--
-- Constraints for table `tr_procurement_item`
--
ALTER TABLE `tr_procurement_item`
  ADD CONSTRAINT `tr_procurement_item_ibfk_1` FOREIGN KEY (`procurementId`) REFERENCES `tr_procurement` (`procurementId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tr_procurement_item_ibfk_2` FOREIGN KEY (`materialId`) REFERENCES `ms_material` (`materialId`) ON UPDATE CASCADE;

--
-- Constraints for table `tr_production_material_usage`
--
ALTER TABLE `tr_production_material_usage`
  ADD CONSTRAINT `tr_production_material_usage_ibfk_1` FOREIGN KEY (`productionOrderId`) REFERENCES `tr_production_order` (`productionOrderId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tr_production_material_usage_ibfk_2` FOREIGN KEY (`materialBatchId`) REFERENCES `tr_material_batch` (`materialBatchId`) ON UPDATE CASCADE;

--
-- Constraints for table `tr_production_order`
--
ALTER TABLE `tr_production_order`
  ADD CONSTRAINT `tr_production_order_ibfk_1` FOREIGN KEY (`employeeId`) REFERENCES `ms_employee` (`employeeId`) ON UPDATE CASCADE;

--
-- Constraints for table `tr_production_result`
--
ALTER TABLE `tr_production_result`
  ADD CONSTRAINT `tr_production_result_ibfk_1` FOREIGN KEY (`productionOrderId`) REFERENCES `tr_production_order` (`productionOrderId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tr_production_result_ibfk_2` FOREIGN KEY (`productBatchId`) REFERENCES `tr_product_batch` (`productBatchId`) ON UPDATE CASCADE;

--
-- Constraints for table `tr_product_batch`
--
ALTER TABLE `tr_product_batch`
  ADD CONSTRAINT `tr_product_batch_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `ms_product` (`productId`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tr_product_batch_ibfk_2` FOREIGN KEY (`warehouseId`) REFERENCES `ms_warehouse` (`warehouseId`) ON UPDATE CASCADE;

--
-- Constraints for table `tr_product_review`
--
ALTER TABLE `tr_product_review`
  ADD CONSTRAINT `tr_product_review_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `ms_product` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tr_product_review_ibfk_2` FOREIGN KEY (`customerId`) REFERENCES `ms_customer` (`customerId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tr_product_review_ibfk_3` FOREIGN KEY (`orderId`) REFERENCES `tr_order` (`orderId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tr_product_stock_movement`
--
ALTER TABLE `tr_product_stock_movement`
  ADD CONSTRAINT `tr_product_stock_movement_ibfk_1` FOREIGN KEY (`productBatchId`) REFERENCES `tr_product_batch` (`productBatchId`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tr_product_stock_movement_ibfk_2` FOREIGN KEY (`warehouseId`) REFERENCES `ms_warehouse` (`warehouseId`) ON UPDATE CASCADE;

--
-- Constraints for table `tr_return`
--
ALTER TABLE `tr_return`
  ADD CONSTRAINT `tr_return_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `tr_order` (`orderId`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tr_return_ibfk_2` FOREIGN KEY (`customerId`) REFERENCES `ms_customer` (`customerId`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tr_return_ibfk_3` FOREIGN KEY (`employeeId`) REFERENCES `ms_employee` (`employeeId`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `tr_return_item`
--
ALTER TABLE `tr_return_item`
  ADD CONSTRAINT `tr_return_item_ibfk_1` FOREIGN KEY (`returnId`) REFERENCES `tr_return` (`returnId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tr_return_item_ibfk_2` FOREIGN KEY (`orderItemId`) REFERENCES `tr_order_item` (`orderItemId`) ON UPDATE CASCADE;

--
-- Constraints for table `tr_shipment`
--
ALTER TABLE `tr_shipment`
  ADD CONSTRAINT `tr_shipment_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `tr_order` (`orderId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tr_shipment_ibfk_2` FOREIGN KEY (`expeditionId`) REFERENCES `ms_expedition` (`expeditionId`) ON UPDATE CASCADE;

--
-- Constraints for table `tr_stock_opname`
--
ALTER TABLE `tr_stock_opname`
  ADD CONSTRAINT `tr_stock_opname_ibfk_1` FOREIGN KEY (`warehouseId`) REFERENCES `ms_warehouse` (`warehouseId`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tr_stock_opname_ibfk_2` FOREIGN KEY (`employeeId`) REFERENCES `ms_employee` (`employeeId`) ON UPDATE CASCADE;

--
-- Constraints for table `tr_stock_opname_item`
--
ALTER TABLE `tr_stock_opname_item`
  ADD CONSTRAINT `tr_stock_opname_item_ibfk_1` FOREIGN KEY (`opnameId`) REFERENCES `tr_stock_opname` (`opnameId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tr_stock_opname_item_ibfk_2` FOREIGN KEY (`productBatchId`) REFERENCES `tr_product_batch` (`productBatchId`) ON UPDATE CASCADE;





-- ========================================================
-- DUMMY DATA FOR PRESENTATION (MIN 10 MASTER, MIN 25 TRANSACTIONS)
-- Generated dynamically to preserve relational integrity
-- ========================================================

-- Dumping data for table `ms_role`
INSERT INTO `ms_role` (`roleId`, `name`, `description`, `isActive`) VALUES
(1, 'Pelanggan', 'Melihat katalog, shopping cart, checkout, B2B portal.', 1),
(2, 'Staf Gudang', 'Validasi QR, monitor expired date FEFO, surat jalan.', 1),
(3, 'Tim Produksi', 'Akses Job Order, scan-out bahan baku, cetak batch.', 1),
(4, 'Pimpinan', 'Dashboard real-time, approval digital, laporan sales.', 1),
(5, 'Admin', 'Kelola user, kelola order e-commerce & omnichannel.', 1),
(6, 'QC Auditor', 'Audit mutu bahan baku, rasa, viskositas, dan pH.', 1),
(7, 'HR Staff', 'Kelola data karyawan dan kehadiran internal pabrik.', 1),
(8, 'Finance Admin', 'Pencatatan invoice corporate dan credit term limit.', 1),
(9, 'Supplier Relation', 'Menangani hubungan pengadaan dengan petani/pabrik luar.', 1),
(10, 'Superadmin', 'Hak akses tertinggi untuk sistem integrasi ERP global.', 1);

-- Dumping data for table `ms_department`
INSERT INTO `ms_department` (`departmentId`, `name`, `description`, `isActive`) VALUES
('DEP-MGT', 'Manajemen / Pimpinan', 'Pemantauan performa sirkulasi stok', 1),
('DEP-WH', 'Gudang (Warehouse)', 'Pencatatan stok bahan baku dan barang jadi', 1),
('DEP-PROD', 'Produksi', 'Mengelola pengolahan bahan mentah hingga saos', 1),
('DEP-QC', 'Quality Control', 'Pengujian mutu, viskositas, pH, dan rasa', 1),
('DEP-ADM', 'Administrasi & Keuangan', 'Invoicing B2B dan administrasi umum', 1),
('DEP-HR', 'Human Resources', 'Pengelolaan staf dan personalia pabrik', 1),
('DEP-SALES', 'Sales & Omnichannel', 'Mengurus marketing e-commerce & B2B', 1),
('DEP-IT', 'IT Support', 'Pemeliharaan server database ERP', 1),
('DEP-PURCH', 'Purchasing', 'Mengurus pengadaan bahan baku ke supplier', 1),
('DEP-LOG', 'Logistics', 'Armada pengiriman internal dan ekspedisi', 1);

-- Dumping data for table `ms_position`
INSERT INTO `ms_position` (`positionId`, `name`, `description`, `isActive`) VALUES
('POS-HEAD', 'Kepala Pabrik / Manager', 'Memimpin operasional pabrik', 1),
('POS-SPV', 'Supervisor', 'Mengawasi staf operasional divisi', 1),
('POS-STAFF', 'Staf Operasional', 'Menjalankan tugas teknis harian', 1),
('POS-OPR', 'Operator Lapangan', 'Menjalankan mesin produksi', 1),
('POS-INTERN', 'Magang / Intern', 'Membantu tugas staf operasional', 1),
('POS-DIR', 'Direktur Utama', 'Pengambil keputusan tertinggi perusahaan', 1),
('POS-AUDIT', 'Auditor Mutu', 'Pengawas QC berkala', 1),
('POS-ANALYST', 'Data Analyst', 'Menganalisis efisiensi sirkulasi gudang', 1),
('POS-LEAD', 'Team Lead', 'Koordinator lapangan regu produksi', 1),
('POS-VP', 'Vice President', 'Wakil pimpinan manajemen', 1);

-- Dumping data for table `ms_user`
INSERT INTO `ms_user` (`userId`, `roleId`, `username`, `email`, `phoneNumber`, `password`, `isActive`) VALUES
('USR-ADM001', 5, 'admin_ksfood', 'admin@ksfood.co.id', '081234567890', '$2y$10$uRlZ/g.wZkYwSskB3hWz0Oszj50V9G.Qv2i7M6R4k03wF8H8g/W8i', 1),
('USR-EMP001', 4, 'grace_ksfood', 'grace@ksfood.co.id', '081234567801', '$2y$10$uRlZ/g.wZkYwSskB3hWz0Oszj50V9G.Qv2i7M6R4k03wF8H8g/W8i', 1),
('USR-EMP002', 2, 'budi_ksfood', 'budi@ksfood.co.id', '081234567802', '$2y$10$uRlZ/g.wZkYwSskB3hWz0Oszj50V9G.Qv2i7M6R4k03wF8H8g/W8i', 1),
('USR-EMP003', 3, 'joko_ksfood', 'joko@ksfood.co.id', '081234567803', '$2y$10$uRlZ/g.wZkYwSskB3hWz0Oszj50V9G.Qv2i7M6R4k03wF8H8g/W8i', 1),
('USR-EMP004', 6, 'siti_ksfood', 'siti@ksfood.co.id', '081234567804', '$2y$10$uRlZ/g.wZkYwSskB3hWz0Oszj50V9G.Qv2i7M6R4k03wF8H8g/W8i', 1),
('USR-EMP005', 6, 'eko_ksfood', 'eko@ksfood.co.id', '081234567805', '$2y$10$uRlZ/g.wZkYwSskB3hWz0Oszj50V9G.Qv2i7M6R4k03wF8H8g/W8i', 1),
('USR-EMP006', 6, 'ratna_ksfood', 'ratna@ksfood.co.id', '081234567806', '$2y$10$uRlZ/g.wZkYwSskB3hWz0Oszj50V9G.Qv2i7M6R4k03wF8H8g/W8i', 1),
('USR-EMP007', 6, 'agus_ksfood', 'agus@ksfood.co.id', '081234567807', '$2y$10$uRlZ/g.wZkYwSskB3hWz0Oszj50V9G.Qv2i7M6R4k03wF8H8g/W8i', 1),
('USR-EMP008', 6, 'dewi_ksfood', 'dewi@ksfood.co.id', '081234567808', '$2y$10$uRlZ/g.wZkYwSskB3hWz0Oszj50V9G.Qv2i7M6R4k03wF8H8g/W8i', 1),
('USR-EMP009', 6, 'hendra_ksfood', 'hendra@ksfood.co.id', '081234567809', '$2y$10$uRlZ/g.wZkYwSskB3hWz0Oszj50V9G.Qv2i7M6R4k03wF8H8g/W8i', 1),
('USR-EMP010', 6, 'mega_ksfood', 'mega@ksfood.co.id', '0812345678010', '$2y$10$uRlZ/g.wZkYwSskB3hWz0Oszj50V9G.Qv2i7M6R4k03wF8H8g/W8i', 1),
('USR-RET001', 1, 'budi_ret', 'budi_ret@gmail.com', '081333333001', '$2y$10$uRlZ/g.wZkYwSskB3hWz0Oszj50V9G.Qv2i7M6R4k03wF8H8g/W8i', 1),
('USR-RET002', 1, 'ani_ret', 'ani_ret@gmail.com', '081333333002', '$2y$10$uRlZ/g.wZkYwSskB3hWz0Oszj50V9G.Qv2i7M6R4k03wF8H8g/W8i', 1),
('USR-RET003', 1, 'candra_ret', 'candra_ret@gmail.com', '081333333003', '$2y$10$uRlZ/g.wZkYwSskB3hWz0Oszj50V9G.Qv2i7M6R4k03wF8H8g/W8i', 1),
('USR-RET004', 1, 'diana_ret', 'diana_ret@gmail.com', '081333333004', '$2y$10$uRlZ/g.wZkYwSskB3hWz0Oszj50V9G.Qv2i7M6R4k03wF8H8g/W8i', 1),
('USR-RET005', 1, 'erik_ret', 'erik_ret@gmail.com', '081333333005', '$2y$10$uRlZ/g.wZkYwSskB3hWz0Oszj50V9G.Qv2i7M6R4k03wF8H8g/W8i', 1),
('USR-RET006', 1, 'fiona_ret', 'fiona_ret@gmail.com', '081333333006', '$2y$10$uRlZ/g.wZkYwSskB3hWz0Oszj50V9G.Qv2i7M6R4k03wF8H8g/W8i', 1),
('USR-RET007', 1, 'gandi_ret', 'gandi_ret@gmail.com', '081333333007', '$2y$10$uRlZ/g.wZkYwSskB3hWz0Oszj50V9G.Qv2i7M6R4k03wF8H8g/W8i', 1),
('USR-RET008', 1, 'hilda_ret', 'hilda_ret@gmail.com', '081333333008', '$2y$10$uRlZ/g.wZkYwSskB3hWz0Oszj50V9G.Qv2i7M6R4k03wF8H8g/W8i', 1),
('USR-RET009', 1, 'indra_ret', 'indra_ret@gmail.com', '081333333009', '$2y$10$uRlZ/g.wZkYwSskB3hWz0Oszj50V9G.Qv2i7M6R4k03wF8H8g/W8i', 1),
('USR-RET010', 1, 'julia_ret', 'julia_ret@gmail.com', '081333333010', '$2y$10$uRlZ/g.wZkYwSskB3hWz0Oszj50V9G.Qv2i7M6R4k03wF8H8g/W8i', 1),
('USR-RET011', 1, 'kiki_ret', 'kiki_ret@gmail.com', '081333333011', '$2y$10$uRlZ/g.wZkYwSskB3hWz0Oszj50V9G.Qv2i7M6R4k03wF8H8g/W8i', 1),
('USR-RET012', 1, 'lisa_ret', 'lisa_ret@gmail.com', '081333333012', '$2y$10$uRlZ/g.wZkYwSskB3hWz0Oszj50V9G.Qv2i7M6R4k03wF8H8g/W8i', 1),
('USR-CORP001', 1, 'mayora_corp', 'procurement@mayora.co.id', '0215555001', '$2y$10$uRlZ/g.wZkYwSskB3hWz0Oszj50V9G.Qv2i7M6R4k03wF8H8g/W8i', 1),
('USR-CORP002', 1, 'gokana_corp', 'procurement@gokana.co.id', '0215555002', '$2y$10$uRlZ/g.wZkYwSskB3hWz0Oszj50V9G.Qv2i7M6R4k03wF8H8g/W8i', 1),
('USR-CORP003', 1, 'garudafood_corp', 'procurement@garudafood.co.id', '0215555003', '$2y$10$uRlZ/g.wZkYwSskB3hWz0Oszj50V9G.Qv2i7M6R4k03wF8H8g/W8i', 1),
('USR-CORP004', 1, 'indofood_corp', 'procurement@indofood.co.id', '0215555004', '$2y$10$uRlZ/g.wZkYwSskB3hWz0Oszj50V9G.Qv2i7M6R4k03wF8H8g/W8i', 1),
('USR-CORP005', 1, 'wings_corp', 'procurement@wings.co.id', '0215555005', '$2y$10$uRlZ/g.wZkYwSskB3hWz0Oszj50V9G.Qv2i7M6R4k03wF8H8g/W8i', 1),
('USR-CORP006', 1, 'abc_corp', 'procurement@abc.co.id', '0215555006', '$2y$10$uRlZ/g.wZkYwSskB3hWz0Oszj50V9G.Qv2i7M6R4k03wF8H8g/W8i', 1),
('USR-CORP007', 1, 'sasa_corp', 'procurement@sasa.co.id', '0215555007', '$2y$10$uRlZ/g.wZkYwSskB3hWz0Oszj50V9G.Qv2i7M6R4k03wF8H8g/W8i', 1),
('USR-CORP008', 1, 'ajinomoto_corp', 'procurement@ajinomoto.co.id', '0215555008', '$2y$10$uRlZ/g.wZkYwSskB3hWz0Oszj50V9G.Qv2i7M6R4k03wF8H8g/W8i', 1),
('USR-CORP009', 1, 'kobe_corp', 'procurement@kobe.co.id', '0215555009', '$2y$10$uRlZ/g.wZkYwSskB3hWz0Oszj50V9G.Qv2i7M6R4k03wF8H8g/W8i', 1),
('USR-CORP010', 1, 'nutrifood_corp', 'procurement@nutrifood.co.id', '0215555010', '$2y$10$uRlZ/g.wZkYwSskB3hWz0Oszj50V9G.Qv2i7M6R4k03wF8H8g/W8i', 1),
('USR-CORP011', 1, 'unilever_corp', 'procurement@unilever.co.id', '0215555011', '$2y$10$uRlZ/g.wZkYwSskB3hWz0Oszj50V9G.Qv2i7M6R4k03wF8H8g/W8i', 1),
('USR-CORP012', 1, 'nestle_corp', 'procurement@nestle.co.id', '0215555012', '$2y$10$uRlZ/g.wZkYwSskB3hWz0Oszj50V9G.Qv2i7M6R4k03wF8H8g/W8i', 1);

-- Dumping data for table `ms_employee`
INSERT INTO `ms_employee` (`employeeId`, `userId`, `departmentId`, `positionId`, `identificationNumber`, `fullName`) VALUES
('EMP-001', 'USR-EMP001', 'DEP-MGT', 'POS-HEAD', '3273010101730001', 'Grace Indriani'),
('EMP-002', 'USR-EMP002', 'DEP-WH', 'POS-STAFF', '3273010101730002', 'Budi Santoso'),
('EMP-003', 'USR-EMP003', 'DEP-PROD', 'POS-OPR', '3273010101730003', 'Joko Susilo'),
('EMP-004', 'USR-EMP004', 'DEP-QC', 'POS-AUDIT', '3273010101730004', 'Siti Aminah'),
('EMP-005', 'USR-EMP005', 'DEP-ADM', 'POS-STAFF', '3273010101730005', 'Eko Prasetyo'),
('EMP-006', 'USR-EMP006', 'DEP-HR', 'POS-SPV', '3273010101730006', 'Ratna Sari'),
('EMP-007', 'USR-EMP007', 'DEP-SALES', 'POS-STAFF', '3273010101730007', 'Agus Setiawan'),
('EMP-008', 'USR-EMP008', 'DEP-IT', 'POS-STAFF', '3273010101730008', 'Dewi Lestari'),
('EMP-009', 'USR-EMP009', 'DEP-PURCH', 'POS-SPV', '3273010101730009', 'Hendra Wijaya'),
('EMP-010', 'USR-EMP010', 'DEP-LOG', 'POS-STAFF', '32730101017300010', 'Megaawati Putri');

-- Dumping data for table `ms_category`
INSERT INTO `ms_category` (`categoryId`, `name`, `description`, `isActive`) VALUES
('CAT-001', 'Saus Pedas', 'Saus sambal cabai pedas', 1),
('CAT-002', 'Saus Tomat', 'Saus tomat manis asam', 1),
('CAT-003', 'Mayones', 'Saus emulsi mayones premium', 1),
('CAT-004', 'Kecap Manis', 'Kecap manis resep tradisional', 1),
('CAT-005', 'Kecap Asin', 'Kecap asin fermentasi kedelai', 1),
('CAT-006', 'Minyak Wijen', 'Minyak aromatik untuk bumbu', 1),
('CAT-007', 'Saus Tiram', 'Saus tiram gurih kental', 1),
('CAT-008', 'Bumbu Bubuk', 'Rempah bubuk dapur', 1),
('CAT-009', 'Saus Teriyaki', 'Saus manis khas jepang', 1),
('CAT-010', 'Cuka Makan', 'Asam asetat encer food grade', 1);

-- Dumping data for table `ms_packaging`
INSERT INTO `ms_packaging` (`packagingId`, `name`, `materialType`, `isActive`) VALUES
('PKG-GLASS250', 'Botol Kaca 250ml', 'Kaca', 1),
('PKG-PET135', 'Botol Plastik PET 135ml', 'Plastik', 1),
('PKG-SACH25', 'Sachet Mylar 25g', 'Mylar', 1),
('PKG-JER10K', 'Jerigen HDPE 10kg', 'Plastik HDPE', 1),
('PKG-GLASS500', 'Botol Kaca 500ml', 'Kaca', 1),
('PKG-PET330', 'Botol Plastik PET 330ml', 'Plastik', 1),
('PKG-SACH50', 'Sachet Mylar 50g', 'Mylar', 1),
('PKG-POUCH1K', 'Stand Pouch 1kg', 'Plastik Nylon', 1),
('PKG-CAN300', 'Kaleng Tinplate 300g', 'Kaleng', 1),
('PKG-GLASS100', 'Botol Kaca 100ml', 'Kaca', 1);

-- Dumping data for table `ms_product`
INSERT INTO `ms_product` (`productId`, `categoryId`, `packagingId`, `stockKeepingUnit`, `name`, `description`, `basePrice`, `unitOfMeasurement`, `weightInGrams`, `cachedTotalStock`, `isActive`) VALUES
('PROD-001', 'CAT-001', 'PKG-PET135', 'SKU-SMBL-135', 'Saos Sambal Pedas Manis 135ml', 'Saos kental rasa pedas manis', 12000.0, 'BOTOL', 150, 0, 1),
('PROD-002', 'CAT-004', 'PKG-GLASS250', 'SKU-KCP-250', 'Kecap Manis Cap Noni 250ml', 'Kecap manis resep tradisional', 18000.0, 'BOTOL', 350, 0, 1),
('PROD-003', 'CAT-003', 'PKG-PET135', 'SKU-MAYO-135', 'Mayones Original Premium 135ml', 'Mayones kental gurih', 15000.0, 'BOTOL', 140, 0, 1),
('PROD-004', 'CAT-002', 'PKG-GLASS500', 'SKU-TOM-500', 'Saus Tomat Asam Manis 500ml', 'Saus tomat dari tomat segar', 22000.0, 'BOTOL', 600, 0, 1),
('PROD-005', 'CAT-005', 'PKG-GLASS100', 'SKU-ASN-100', 'Kecap Asin Kedelai Hitam 100ml', 'Kecap asin gurih fermentasi', 9500.0, 'BOTOL', 180, 0, 1),
('PROD-006', 'CAT-006', 'PKG-GLASS100', 'SKU-WJN-100', 'Minyak Wijen Wangi Murni 100ml', 'Minyak wijen aromatik tinggi', 25000.0, 'BOTOL', 180, 0, 1),
('PROD-007', 'CAT-007', 'PKG-POUCH1K', 'SKU-TRM-1K', 'Saus Tiram Selera Gurih 1kg', 'Saus tiram kental kemasan isi ulang', 45000.0, 'POUCH', 1050, 0, 1),
('PROD-008', 'CAT-008', 'PKG-SACH25', 'SKU-LADA-25', 'Bumbu Lada Putih Bubuk 25g', 'Lada putih murni bubuk sachet', 3500.0, 'SACHET', 28, 0, 1),
('PROD-009', 'CAT-009', 'PKG-PET330', 'SKU-TERI-330', 'Saus Teriyaki Jepang 330ml', 'Saus teriyaki untuk tumisan', 28000.0, 'BOTOL', 380, 0, 1),
('PROD-010', 'CAT-010', 'PKG-JER10K', 'SKU-CUKA-10K', 'Cuka Makan Asam Murni 10kg', 'Cuka makan kemasan jerigen industri', 98000.0, 'JERIGEN', 10500, 0, 1);

-- Dumping data for table `ms_warehouse`
INSERT INTO `ms_warehouse` (`warehouseId`, `name`, `address`, `capacity`, `isActive`) VALUES
('WH-RAW-01', 'Gudang Bahan Baku A', 'Area Pabrik KS Food Blok A1, Bandung', 5000, 1),
('WH-FIN-01', 'Gudang Barang Jadi B', 'Area Pabrik KS Food Blok B2, Bandung', 10000, 1),
('WH-PKG-01', 'Gudang Kemasan C', 'Area Pabrik KS Food Blok C1, Bandung', 8000, 1),
('WH-RET-01', 'Gudang Barang Retur D', 'Area Pabrik KS Food Blok D1, Bandung', 2000, 1),
('WH-SPARE-01', 'Gudang Suku Cadang Mesin', 'Area Pabrik KS Food Blok E1, Bandung', 1000, 1),
('WH-RAW-02', 'Gudang Bahan Baku Basah (Chiller)', 'Area Pabrik KS Food Blok A2, Bandung', 3000, 1),
('WH-FIN-02', 'Gudang Barang Jadi Cirebon', 'Kawasan Logistik Cirebon No. 12', 15000, 1),
('WH-FIN-03', 'Gudang Transit Jakarta', 'Kawasan Logistik Marunda, Jakarta Utara', 20000, 1),
('WH-SPICE-01', 'Gudang Rempah & Bubuk', 'Area Pabrik KS Food Blok F1, Bandung', 4000, 1),
('WH-LIQ-01', 'Gudang Tangki Cairan', 'Area Pabrik KS Food Blok G1, Bandung', 50000, 1);

-- Dumping data for table `ms_material`
INSERT INTO `ms_material` (`materialId`, `materialCode`, `name`, `unitOfMeasurement`, `minimumStockAlert`, `isActive`) VALUES
('MAT-CBI-01', 'MCODE-CHILI-01', 'Cabai Rawit Merah Segar', 'KG', 100, 1),
('MAT-TMT-01', 'MCODE-TOMATO-01', 'Tomat Merah Pilihan', 'KG', 150, 1),
('MAT-BWP-01', 'MCODE-GARLIC-01', 'Bawang Putih Kupas', 'KG', 50, 1),
('MAT-GLM-01', 'MCODE-SUGAR-01', 'Gula Merah Kelapa', 'KG', 200, 1),
('MAT-GARAM-01', 'MCODE-SALT-01', 'Garam Refinasi Halus', 'KG', 300, 1),
('MAT-MINYAK-01', 'MCODE-OIL-01', 'Minyak Sawit Murni', 'LITER', 500, 1),
('MAT-KDL-01', 'MCODE-SOYBEAN-01', 'Kedelai Hitam Pilihan', 'KG', 400, 1),
('MAT-AIR-01', 'MCODE-WATER-01', 'Air Bersih Filtered', 'LITER', 1000, 1),
('MAT-MSG-01', 'MCODE-MSG-01', 'Penguat Rasa MSG', 'KG', 20, 1),
('MAT-PGA-01', 'MCODE-PRESERV-01', 'Natrium Benzoat Pengawet', 'KG', 10, 1);

-- Dumping data for table `ms_supplier`
INSERT INTO `ms_supplier` (`supplierId`, `name`, `address`, `contactName`, `contactPhone`, `isActive`) VALUES
('SPL-TANI-01', 'Kelompok Tani Subur Makmur', 'Kecamatan Lembang, Bandung Barat', 'Pak Wayan', '085123456789', 1),
('SPL-KMSN-01', 'PT Surya Plastindo Utama', 'Kawasan Industri Rancaekek, Bandung', 'Ibu Ratna', '085987654321', 1),
('SPL-KACA-01', 'PT Glassindo Jaya Abadi', 'Kawasan Industri Cikarang Barat', 'Pak Agung', '081122334455', 1),
('SPL-SOY-01', 'CV Kedelai Nusantara', 'Kecamatan Grobogan, Jawa Tengah', 'Pak Slamet', '082233445566', 1),
('SPL-SALT-01', 'PT Garam Mas Indonesia', 'Area Tambak Garam Madura, Jatim', 'Ibu Aminah', '083344556677', 1),
('SPL-SUG-01', 'Pabrik Gula Tebu Lestari', 'Kecamatan Karanganyar, Jawa Tengah', 'Bapak Danu', '084455667788', 1),
('SPL-SPICE-01', 'CV Rempah Maluku Utama', 'Kota Ambon, Maluku', 'Pak Hasan', '085566778899', 1),
('SPL-OIL-01', 'PT Sawit Sejahtera Tbk', 'Kawasan Industri Dumai, Riau', 'Bapak Rian', '086677889900', 1),
('SPL-CHEM-01', 'PT Kimia Pangan Abadi', 'Kawasan Industri Pulogadung, Jakarta', 'Ibu Fitri', '087788990011', 1),
('SPL-WATER-01', 'PDAM Tirta Raharja Bandung', 'Jl. Kolonel Masturi No. 1, Cimahi', 'Bapak Bagus', '088899001122', 1);

-- Dumping data for table `ms_tax`
INSERT INTO `ms_tax` (`taxId`, `name`, `ratePercentage`, `isActive`) VALUES
('TAX-PPN11', 'PPN 11%', 11.0, 1),
('TAX-PPN00', 'PPN Bebas 0%', 0.0, 1),
('TAX-PPN12', 'PPN 12% (Rencana Masa Depan)', 12.0, 1),
('TAX-PB1-10', 'Pajak Daerah PB1 10%', 10.0, 1),
('TAX-EXPORT', 'Pajak Ekspor 0%', 0.0, 1),
('TAX-DUMMY1', 'Pajak Tambahan Darurat 1%', 1.0, 1),
('TAX-DUMMY2', 'PPN 5% UMKM', 5.0, 1),
('TAX-DUMMY3', 'PPN 7.5% Khusus', 7.5, 1),
('TAX-DUMMY4', 'Pajak Retribusi 2%', 2.0, 1),
('TAX-DUMMY5', 'Pajak Layanan 2.5%', 2.5, 1);

-- Dumping data for table `ms_sales_channel`
INSERT INTO `ms_sales_channel` (`channelId`, `name`, `platformFeePercentage`, `isActive`) VALUES
('CHN-B2B', 'B2B Portal Corporate', 0.0, 1),
('CHN-B2C', 'E-Commerce Website Mandiri', 0.0, 1),
('CHN-TOKOPEDIA', 'Tokopedia Official Store', 4.5, 1),
('CHN-SHOPEE', 'Shopee Mall Store', 5.0, 1),
('CHN-TIKTOK', 'TikTok Shop Affiliate', 6.0, 1),
('CHN-LAZADA', 'Lazada LazMall', 4.0, 1),
('CHN-DISTRIBUTOR', 'Distributor Offline Center', 0.0, 1),
('CHN-KANVAS', 'Sales Canvassing Direct', 0.0, 1),
('CHN-EXHIBITION', 'Pameran & Expo Bulanan', 0.0, 1),
('CHN-BLIBLI', 'Blibli Merchant', 3.5, 1);

-- Dumping data for table `ms_payment_method`
INSERT INTO `ms_payment_method` (`paymentMethodId`, `name`, `provider`, `accountNumber`, `isActive`) VALUES
('PAY-TRANSFER', 'Transfer Bank B2B', 'Bank BCA', '8001234567', 1),
('PAY-MANDIRI', 'Transfer Bank Mandiri B2B', 'Bank Mandiri', '13100223344', 1),
('PAY-BRI', 'Transfer Bank BRI B2B', 'Bank BRI', '00112233445566', 1),
('PAY-GOPAY', 'Gopay E-Wallet', 'Midtrans GoPay', '-', 1),
('PAY-OVO', 'OVO E-Wallet', 'Midtrans OVO', '-', 1),
('PAY-SHOPEEPAY', 'ShopeePay E-Wallet', 'ShopeePay', '-', 1),
('PAY-CREDIT', 'Kartu Kredit Visa/Master', 'Xendit Gateway', '-', 1),
('PAY-COD', 'Cash On Delivery Ritel', 'Ekspedisi Kurir', '-', 1),
('PAY-CREDITTERM', 'Credit Term Invoice (B2B)', 'KS Food Finance', '-', 1),
('PAY-CASH', 'Cash Tunai Toko', 'Kasir Outlet Pabrik', '-', 1);

-- Dumping data for table `ms_expedition`
INSERT INTO `ms_expedition` (`expeditionId`, `name`, `serviceType`, `isActive`) VALUES
('EXP-INTERNAL', 'Armada Internal Pabrik', 'Logistik Darat', 1),
('EXP-JNE', 'JNE Express', 'Kurir Reguler & Cargo', 1),
('EXP-JNT', 'J&T Express', 'Kurir Reguler', 1),
('EXP-SICEPAT', 'SiCepat Ekspres', 'Kurir Reguler & Gokil Cargo', 1),
('EXP-ANTERAJA', 'Anteraja', 'Kurir Reguler', 1),
('EXP-GOSEND', 'GoSend Instant', 'Kurir Motor Instant', 1),
('EXP-GRAB', 'GrabExpress Instant', 'Kurir Motor Instant', 1),
('EXP-DELIVEREE', 'Deliveree Cargo', 'Truk Box Eksternal', 1),
('EXP-WAHANA', 'Wahana Logistik', 'Kurir Ekonomis', 1),
('EXP-LION', 'Lion Parcel', 'Kurir Kargo Udara', 1);

-- Dumping data for table `ms_customer`
INSERT INTO `ms_customer` (`customerId`, `userId`, `fullName`, `type`, `isActive`) VALUES
('CUST-RET-001', 'USR-RET001', 'Budi Hartono', 'RETAIL', 1),
('CUST-RET-002', 'USR-RET002', 'Ani Hartono', 'RETAIL', 1),
('CUST-RET-003', 'USR-RET003', 'Candra Hartono', 'RETAIL', 1),
('CUST-RET-004', 'USR-RET004', 'Diana Hartono', 'RETAIL', 1),
('CUST-RET-005', 'USR-RET005', 'Erik Hartono', 'RETAIL', 1),
('CUST-RET-006', 'USR-RET006', 'Fiona Hartono', 'RETAIL', 1),
('CUST-RET-007', 'USR-RET007', 'Gandi Hartono', 'RETAIL', 1),
('CUST-RET-008', 'USR-RET008', 'Hilda Hartono', 'RETAIL', 1),
('CUST-RET-009', 'USR-RET009', 'Indra Hartono', 'RETAIL', 1),
('CUST-RET-010', 'USR-RET010', 'Julia Hartono', 'RETAIL', 1),
('CUST-RET-011', 'USR-RET011', 'Kiki Hartono', 'RETAIL', 1),
('CUST-RET-012', 'USR-RET012', 'Lisa Hartono', 'RETAIL', 1),
('CUST-CORP-001', 'USR-CORP001', 'PT Mayora Indah Tbk', 'CORPORATE', 1),
('CUST-CORP-002', 'USR-CORP002', 'PT Gokana Resto Indonesia', 'CORPORATE', 1),
('CUST-CORP-003', 'USR-CORP003', 'PT Garuda Food Putra Putri Tbk', 'CORPORATE', 1),
('CUST-CORP-004', 'USR-CORP004', 'PT Indofood CBP Sukses Makmur', 'CORPORATE', 1),
('CUST-CORP-005', 'USR-CORP005', 'PT Wings Surya', 'CORPORATE', 1),
('CUST-CORP-006', 'USR-CORP006', 'PT ABC President Indonesia', 'CORPORATE', 1),
('CUST-CORP-007', 'USR-CORP007', 'PT Sasa Inti', 'CORPORATE', 1),
('CUST-CORP-008', 'USR-CORP008', 'PT Ajinomoto Indonesia', 'CORPORATE', 1),
('CUST-CORP-009', 'USR-CORP009', 'PT Kobe Boga Utama', 'CORPORATE', 1),
('CUST-CORP-010', 'USR-CORP010', 'PT Nutrifood Indonesia', 'CORPORATE', 1),
('CUST-CORP-011', 'USR-CORP011', 'PT Unilever Indonesia Tbk', 'CORPORATE', 1),
('CUST-CORP-012', 'USR-CORP012', 'PT Nestle Indonesia', 'CORPORATE', 1);

-- Dumping data for table `ms_retail`
INSERT INTO `ms_retail` (`retailId`, `customerId`, `loyaltyPoint`, `birthDate`, `gender`) VALUES
('RET-001', 'CUST-RET-001', 100, '1990-01-15', 'MALE'),
('RET-002', 'CUST-RET-002', 200, '1990-02-15', 'FEMALE'),
('RET-003', 'CUST-RET-003', 300, '1990-03-15', 'MALE'),
('RET-004', 'CUST-RET-004', 400, '1990-04-15', 'FEMALE'),
('RET-005', 'CUST-RET-005', 500, '1990-05-15', 'MALE'),
('RET-006', 'CUST-RET-006', 600, '1990-06-15', 'FEMALE'),
('RET-007', 'CUST-RET-007', 700, '1990-07-15', 'MALE'),
('RET-008', 'CUST-RET-008', 800, '1990-08-15', 'FEMALE'),
('RET-009', 'CUST-RET-009', 900, '1990-09-15', 'MALE'),
('RET-010', 'CUST-RET-010', 1000, '1990-10-15', 'FEMALE'),
('RET-011', 'CUST-RET-011', 1100, '1990-11-15', 'MALE'),
('RET-012', 'CUST-RET-012', 1200, '1990-12-15', 'FEMALE');

-- Dumping data for table `ms_corporate`
INSERT INTO `ms_corporate` (`corporateId`, `customerId`, `companyName`, `taxIdentificationNumber`, `personInChargeName`, `personInChargePhone`, `creditLimit`, `paymentTermDays`) VALUES
('CORP-001', 'CUST-CORP-001', 'PT Mayora Indah Tbk', '01.234.567.8-0101.000', 'Bapak/Ibu Budi', '081299998801', 60000000.0, 30),
('CORP-002', 'CUST-CORP-002', 'PT Gokana Resto Indonesia', '01.234.567.8-0102.000', 'Bapak/Ibu Ani', '081299998802', 70000000.0, 14),
('CORP-003', 'CUST-CORP-003', 'PT Garuda Food Putra Putri Tbk', '01.234.567.8-0103.000', 'Bapak/Ibu Candra', '081299998803', 80000000.0, 30),
('CORP-004', 'CUST-CORP-004', 'PT Indofood CBP Sukses Makmur', '01.234.567.8-0104.000', 'Bapak/Ibu Diana', '081299998804', 90000000.0, 14),
('CORP-005', 'CUST-CORP-005', 'PT Wings Surya', '01.234.567.8-0105.000', 'Bapak/Ibu Erik', '081299998805', 100000000.0, 30),
('CORP-006', 'CUST-CORP-006', 'PT ABC President Indonesia', '01.234.567.8-0106.000', 'Bapak/Ibu Fiona', '081299998806', 110000000.0, 14),
('CORP-007', 'CUST-CORP-007', 'PT Sasa Inti', '01.234.567.8-0107.000', 'Bapak/Ibu Gandi', '081299998807', 120000000.0, 30),
('CORP-008', 'CUST-CORP-008', 'PT Ajinomoto Indonesia', '01.234.567.8-0108.000', 'Bapak/Ibu Hilda', '081299998808', 130000000.0, 14),
('CORP-009', 'CUST-CORP-009', 'PT Kobe Boga Utama', '01.234.567.8-0109.000', 'Bapak/Ibu Indra', '081299998809', 140000000.0, 30),
('CORP-010', 'CUST-CORP-010', 'PT Nutrifood Indonesia', '01.234.567.8-0110.000', 'Bapak/Ibu Julia', '081299998810', 150000000.0, 14),
('CORP-011', 'CUST-CORP-011', 'PT Unilever Indonesia Tbk', '01.234.567.8-0111.000', 'Bapak/Ibu Kiki', '081299998811', 160000000.0, 30),
('CORP-012', 'CUST-CORP-012', 'PT Nestle Indonesia', '01.234.567.8-0112.000', 'Bapak/Ibu Lisa', '081299998812', 170000000.0, 14);

-- Dumping data for table `ms_address`
INSERT INTO `ms_address` (`addressId`, `customerId`, `label`, `fullAddress`, `city`, `province`, `postalCode`, `isPrimary`) VALUES
('ADDR-RET-001', 'CUST-RET-001', 'Rumah Budi', 'Jl. Kebon Jeruk Indah No. 1', 'Jakarta Barat', 'DKI Jakarta', '11530', 1),
('ADDR-RET-002', 'CUST-RET-002', 'Rumah Ani', 'Jl. Kebon Jeruk Indah No. 2', 'Jakarta Barat', 'DKI Jakarta', '11530', 1),
('ADDR-RET-003', 'CUST-RET-003', 'Rumah Candra', 'Jl. Kebon Jeruk Indah No. 3', 'Jakarta Barat', 'DKI Jakarta', '11530', 1),
('ADDR-RET-004', 'CUST-RET-004', 'Rumah Diana', 'Jl. Kebon Jeruk Indah No. 4', 'Jakarta Barat', 'DKI Jakarta', '11530', 1),
('ADDR-RET-005', 'CUST-RET-005', 'Rumah Erik', 'Jl. Kebon Jeruk Indah No. 5', 'Jakarta Barat', 'DKI Jakarta', '11530', 1),
('ADDR-RET-006', 'CUST-RET-006', 'Rumah Fiona', 'Jl. Kebon Jeruk Indah No. 6', 'Jakarta Barat', 'DKI Jakarta', '11530', 1),
('ADDR-RET-007', 'CUST-RET-007', 'Rumah Gandi', 'Jl. Kebon Jeruk Indah No. 7', 'Jakarta Barat', 'DKI Jakarta', '11530', 1),
('ADDR-RET-008', 'CUST-RET-008', 'Rumah Hilda', 'Jl. Kebon Jeruk Indah No. 8', 'Jakarta Barat', 'DKI Jakarta', '11530', 1),
('ADDR-RET-009', 'CUST-RET-009', 'Rumah Indra', 'Jl. Kebon Jeruk Indah No. 9', 'Jakarta Barat', 'DKI Jakarta', '11530', 1),
('ADDR-RET-010', 'CUST-RET-010', 'Rumah Julia', 'Jl. Kebon Jeruk Indah No. 10', 'Jakarta Barat', 'DKI Jakarta', '11530', 1),
('ADDR-RET-011', 'CUST-RET-011', 'Rumah Kiki', 'Jl. Kebon Jeruk Indah No. 11', 'Jakarta Barat', 'DKI Jakarta', '11530', 1),
('ADDR-RET-012', 'CUST-RET-012', 'Rumah Lisa', 'Jl. Kebon Jeruk Indah No. 12', 'Jakarta Barat', 'DKI Jakarta', '11530', 1),
('ADDR-CORP-001', 'CUST-CORP-001', 'Gudang Pusat Mayora', 'Kawasan Industri Cikarang Blok C/1', 'Tangerang', 'Banten', '15136', 1),
('ADDR-CORP-002', 'CUST-CORP-002', 'Gudang Pusat Gokana', 'Kawasan Industri Cikarang Blok C/2', 'Tangerang', 'Banten', '15136', 1),
('ADDR-CORP-003', 'CUST-CORP-003', 'Gudang Pusat Garuda', 'Kawasan Industri Cikarang Blok C/3', 'Tangerang', 'Banten', '15136', 1),
('ADDR-CORP-004', 'CUST-CORP-004', 'Gudang Pusat Indofood', 'Kawasan Industri Cikarang Blok C/4', 'Tangerang', 'Banten', '15136', 1),
('ADDR-CORP-005', 'CUST-CORP-005', 'Gudang Pusat Wings', 'Kawasan Industri Cikarang Blok C/5', 'Tangerang', 'Banten', '15136', 1),
('ADDR-CORP-006', 'CUST-CORP-006', 'Gudang Pusat ABC', 'Kawasan Industri Cikarang Blok C/6', 'Tangerang', 'Banten', '15136', 1),
('ADDR-CORP-007', 'CUST-CORP-007', 'Gudang Pusat Sasa', 'Kawasan Industri Cikarang Blok C/7', 'Tangerang', 'Banten', '15136', 1),
('ADDR-CORP-008', 'CUST-CORP-008', 'Gudang Pusat Ajinomoto', 'Kawasan Industri Cikarang Blok C/8', 'Tangerang', 'Banten', '15136', 1),
('ADDR-CORP-009', 'CUST-CORP-009', 'Gudang Pusat Kobe', 'Kawasan Industri Cikarang Blok C/9', 'Tangerang', 'Banten', '15136', 1),
('ADDR-CORP-010', 'CUST-CORP-010', 'Gudang Pusat Nutrifood', 'Kawasan Industri Cikarang Blok C/10', 'Tangerang', 'Banten', '15136', 1),
('ADDR-CORP-011', 'CUST-CORP-011', 'Gudang Pusat Unilever', 'Kawasan Industri Cikarang Blok C/11', 'Tangerang', 'Banten', '15136', 1),
('ADDR-CORP-012', 'CUST-CORP-012', 'Gudang Pusat Nestle', 'Kawasan Industri Cikarang Blok C/12', 'Tangerang', 'Banten', '15136', 1);

-- Dumping data for table `ms_purchase_agreement`
INSERT INTO `ms_purchase_agreement` (`agreementId`, `corporateId`, `startDate`, `endDate`, `status`) VALUES
('AGR-CORP-001', 'CORP-001', '2026-01-01', '2026-12-31', 'ACTIVE'),
('AGR-CORP-002', 'CORP-002', '2026-01-01', '2026-12-31', 'ACTIVE'),
('AGR-CORP-003', 'CORP-003', '2026-01-01', '2026-12-31', 'ACTIVE'),
('AGR-CORP-004', 'CORP-004', '2026-01-01', '2026-12-31', 'ACTIVE'),
('AGR-CORP-005', 'CORP-005', '2026-01-01', '2026-12-31', 'ACTIVE'),
('AGR-CORP-006', 'CORP-006', '2026-01-01', '2026-12-31', 'ACTIVE'),
('AGR-CORP-007', 'CORP-007', '2026-01-01', '2026-12-31', 'ACTIVE'),
('AGR-CORP-008', 'CORP-008', '2026-01-01', '2026-12-31', 'ACTIVE'),
('AGR-CORP-009', 'CORP-009', '2026-01-01', '2026-12-31', 'ACTIVE'),
('AGR-CORP-010', 'CORP-010', '2026-01-01', '2026-12-31', 'ACTIVE'),
('AGR-CORP-011', 'CORP-011', '2026-01-01', '2026-12-31', 'EXPIRED'),
('AGR-CORP-012', 'CORP-012', '2026-01-01', '2026-12-31', 'EXPIRED');

-- Dumping data for table `ms_purchase_agreement_item`
INSERT INTO `ms_purchase_agreement_item` (`agreementItemId`, `agreementId`, `productId`, `negotiatedPrice`, `minimumOrderQuantity`) VALUES
('AGRITEM-001', 'AGR-CORP-001', 'PROD-001', 10600.0, 100),
('AGRITEM-002', 'AGR-CORP-001', 'PROD-002', 16100.0, 50),
('AGRITEM-003', 'AGR-CORP-002', 'PROD-001', 10700.0, 100),
('AGRITEM-004', 'AGR-CORP-002', 'PROD-002', 16200.0, 50),
('AGRITEM-005', 'AGR-CORP-003', 'PROD-001', 10800.0, 100),
('AGRITEM-006', 'AGR-CORP-003', 'PROD-002', 16300.0, 50),
('AGRITEM-007', 'AGR-CORP-004', 'PROD-001', 10900.0, 100),
('AGRITEM-008', 'AGR-CORP-004', 'PROD-002', 16400.0, 50),
('AGRITEM-009', 'AGR-CORP-005', 'PROD-001', 11000.0, 100),
('AGRITEM-010', 'AGR-CORP-005', 'PROD-002', 16500.0, 50),
('AGRITEM-011', 'AGR-CORP-006', 'PROD-001', 11100.0, 100),
('AGRITEM-012', 'AGR-CORP-006', 'PROD-002', 16600.0, 50),
('AGRITEM-013', 'AGR-CORP-007', 'PROD-001', 11200.0, 100),
('AGRITEM-014', 'AGR-CORP-007', 'PROD-002', 16700.0, 50),
('AGRITEM-015', 'AGR-CORP-008', 'PROD-001', 11300.0, 100),
('AGRITEM-016', 'AGR-CORP-008', 'PROD-002', 16800.0, 50),
('AGRITEM-017', 'AGR-CORP-009', 'PROD-001', 11400.0, 100),
('AGRITEM-018', 'AGR-CORP-009', 'PROD-002', 16900.0, 50),
('AGRITEM-019', 'AGR-CORP-010', 'PROD-001', 11500.0, 100),
('AGRITEM-020', 'AGR-CORP-010', 'PROD-002', 17000.0, 50),
('AGRITEM-021', 'AGR-CORP-011', 'PROD-001', 11600.0, 100),
('AGRITEM-022', 'AGR-CORP-011', 'PROD-002', 17100.0, 50),
('AGRITEM-023', 'AGR-CORP-012', 'PROD-001', 11700.0, 100),
('AGRITEM-024', 'AGR-CORP-012', 'PROD-002', 17200.0, 50);

-- Dumping data for table `ms_setting`
INSERT INTO `ms_setting` (`settingId`, `settingKey`, `settingValue`, `description`) VALUES
(1, 'company_name', 'CV Kertasari Sejahtera', 'Nama perusahaan pemilik ERP'),
(2, 'app_version', '1.0.0-prototype', 'Versi rilis ERP system'),
(3, 'default_tax_rate', '11.00', 'Rate PPN default'),
(4, 'low_stock_threshold_material', '100', 'Ambang batas waspada bahan baku'),
(5, 'low_stock_threshold_product', '200', 'Ambang batas waspada produk jadi'),
(6, 'fefo_expiry_warning_days', '30', 'Pemberitahuan expired date FEFO'),
(7, 'b2b_max_credit_days_default', '30', 'Term pembayaran default B2B'),
(8, 'currency_symbol', 'Rp', 'Simbol mata uang sistem'),
(9, 'sender_email_noreply', 'noreply@ksfood.co.id', 'Email notifikasi otomatis'),
(10, 'sms_gateway_provider', 'Zenziva SMS', 'Provider SMS OTP/notifikasi');

-- Dumping data for table `ms_promotion`
INSERT INTO `ms_promotion` (`promotionId`, `code`, `name`, `type`, `discountValue`, `minimumPurchase`, `maximumDiscount`, `startDate`, `endDate`, `usageQuota`) VALUES
('PROMO-001', 'DISKON10', 'Diskon 10% Spesial Ritel', 'DISCOUNT_PERCENTAGE', 10.0, 50000.0, 20000.0, '2026-06-01 00:00:00', '2026-12-31 23:59:59', 100),
('PROMO-002', 'POTONGAN5K', 'Diskon Langsung Rp 5.000', 'DISCOUNT_NOMINAL', 5000.0, 30000.0, 5000.0, '2026-06-01 00:00:00', '2026-12-31 23:59:59', 200),
('PROMO-003', 'ONGKIRGRATIS', 'Gratis Ongkir Maks 15K', 'FREE_SHIPPING', 15000.0, 75000.0, 15000.0, '2026-06-01 00:00:00', '2026-12-31 23:59:59', 300),
('PROMO-004', 'MUDIKBERKAH', 'Promo Spesial Lebaran 15%', 'DISCOUNT_PERCENTAGE', 15.0, 100000.0, 50000.0, '2026-06-01 00:00:00', '2026-12-31 23:59:59', 150),
('PROMO-005', 'CASHBACK20K', 'Cashback Nominal 20K', 'DISCOUNT_NOMINAL', 20000.0, 150000.0, 20000.0, '2026-06-01 00:00:00', '2026-12-31 23:59:59', 80),
('PROMO-006', 'FREE_SHIP_MAX', 'Gratis Ongkir Tanpa Min Belanja', 'FREE_SHIPPING', 30000.0, 0.0, 30000.0, '2026-06-01 00:00:00', '2026-12-31 23:59:59', 100),
('PROMO-007', 'PROMO_MAYONES', 'Diskon Mayones 20%', 'DISCOUNT_PERCENTAGE', 20.0, 40000.0, 10000.0, '2026-06-01 00:00:00', '2026-12-31 23:59:59', 50),
('PROMO-008', 'KECAP_LEGEND', 'Potongan Harga Kecap Rp 3.000', 'DISCOUNT_NOMINAL', 3000.0, 20000.0, 3000.0, '2026-06-01 00:00:00', '2026-12-31 23:59:59', 500),
('PROMO-009', 'DISC_50PERCENT', 'Diskon Gila 50% Cuci Gudang', 'DISCOUNT_PERCENTAGE', 50.0, 200000.0, 100000.0, '2026-06-01 00:00:00', '2026-06-15 23:59:59', 30),
('PROMO-010', 'B2B_PROMO_5', 'Diskon Kontrak B2B Tambahan 5%', 'DISCOUNT_PERCENTAGE', 5.0, 5000000.0, 500000.0, '2026-06-01 00:00:00', '2026-12-31 23:59:59', 20);

-- Dumping data for table `tr_procurement`
INSERT INTO `tr_procurement` (`procurementId`, `supplierId`, `purchaseOrderDate`, `expectedArrivalDate`, `status`, `totalAmount`) VALUES
('PROC-001', 'SPL-TANI-01', '2026-05-01', '2026-05-03', 'COMPLETED', 1000000.0),
('PROC-002', 'SPL-KMSN-01', '2026-05-02', '2026-05-04', 'COMPLETED', 2000000.0),
('PROC-003', 'SPL-KACA-01', '2026-05-03', '2026-05-05', 'COMPLETED', 3000000.0),
('PROC-004', 'SPL-SOY-01', '2026-05-04', '2026-05-06', 'COMPLETED', 4000000.0),
('PROC-005', 'SPL-SALT-01', '2026-05-05', '2026-05-07', 'COMPLETED', 5000000.0),
('PROC-006', 'SPL-SUG-01', '2026-05-06', '2026-05-08', 'COMPLETED', 6000000.0),
('PROC-007', 'SPL-SPICE-01', '2026-05-07', '2026-05-09', 'COMPLETED', 7000000.0),
('PROC-008', 'SPL-OIL-01', '2026-05-08', '2026-05-10', 'COMPLETED', 8000000.0),
('PROC-009', 'SPL-CHEM-01', '2026-05-09', '2026-05-11', 'COMPLETED', 9000000.0),
('PROC-010', 'SPL-WATER-01', '2026-05-10', '2026-05-12', 'COMPLETED', 10000000.0),
('PROC-011', 'SPL-TANI-01', '2026-05-11', '2026-05-13', 'COMPLETED', 11000000.0),
('PROC-012', 'SPL-KMSN-01', '2026-05-12', '2026-05-14', 'COMPLETED', 12000000.0),
('PROC-013', 'SPL-KACA-01', '2026-05-13', '2026-05-15', 'COMPLETED', 13000000.0),
('PROC-014', 'SPL-SOY-01', '2026-05-14', '2026-05-16', 'COMPLETED', 14000000.0),
('PROC-015', 'SPL-SALT-01', '2026-05-15', '2026-05-17', 'COMPLETED', 15000000.0),
('PROC-016', 'SPL-SUG-01', '2026-05-16', '2026-05-18', 'COMPLETED', 16000000.0),
('PROC-017', 'SPL-SPICE-01', '2026-05-17', '2026-05-19', 'COMPLETED', 17000000.0),
('PROC-018', 'SPL-OIL-01', '2026-05-18', '2026-05-20', 'COMPLETED', 18000000.0),
('PROC-019', 'SPL-CHEM-01', '2026-05-19', '2026-05-21', 'COMPLETED', 19000000.0),
('PROC-020', 'SPL-WATER-01', '2026-05-20', '2026-05-22', 'COMPLETED', 20000000.0),
('PROC-021', 'SPL-TANI-01', '2026-05-21', '2026-05-23', 'COMPLETED', 21000000.0),
('PROC-022', 'SPL-KMSN-01', '2026-05-22', '2026-05-24', 'SENT_TO_SUPPLIER', 22000000.0),
('PROC-023', 'SPL-KACA-01', '2026-05-23', '2026-05-25', 'SENT_TO_SUPPLIER', 23000000.0),
('PROC-024', 'SPL-SOY-01', '2026-05-24', '2026-05-26', 'SENT_TO_SUPPLIER', 24000000.0),
('PROC-025', 'SPL-SALT-01', '2026-05-25', '2026-05-27', 'SENT_TO_SUPPLIER', 25000000.0);

-- Dumping data for table `tr_procurement_item`
INSERT INTO `tr_procurement_item` (`procurementItemId`, `procurementId`, `materialId`, `orderedQuantity`, `receivedQuantity`, `price`) VALUES
('PROCITEM-001', 'PROC-001', 'MAT-CBI-01', 100.0, 100.0, 10000.00),
('PROCITEM-002', 'PROC-002', 'MAT-CBI-01', 200.0, 200.0, 10000.00),
('PROCITEM-003', 'PROC-003', 'MAT-CBI-01', 300.0, 300.0, 10000.00),
('PROCITEM-004', 'PROC-004', 'MAT-CBI-01', 400.0, 400.0, 10000.00),
('PROCITEM-005', 'PROC-005', 'MAT-CBI-01', 500.0, 500.0, 10000.00),
('PROCITEM-006', 'PROC-006', 'MAT-CBI-01', 600.0, 600.0, 10000.00),
('PROCITEM-007', 'PROC-007', 'MAT-CBI-01', 700.0, 700.0, 10000.00),
('PROCITEM-008', 'PROC-008', 'MAT-CBI-01', 800.0, 800.0, 10000.00),
('PROCITEM-009', 'PROC-009', 'MAT-CBI-01', 900.0, 900.0, 10000.00),
('PROCITEM-010', 'PROC-010', 'MAT-CBI-01', 1000.0, 1000.0, 10000.00),
('PROCITEM-011', 'PROC-011', 'MAT-CBI-01', 1100.0, 1100.0, 10000.00),
('PROCITEM-012', 'PROC-012', 'MAT-CBI-01', 1200.0, 1200.0, 10000.00),
('PROCITEM-013', 'PROC-013', 'MAT-CBI-01', 1300.0, 1300.0, 10000.00),
('PROCITEM-014', 'PROC-014', 'MAT-CBI-01', 1400.0, 1400.0, 10000.00),
('PROCITEM-015', 'PROC-015', 'MAT-CBI-01', 1500.0, 1500.0, 10000.00),
('PROCITEM-016', 'PROC-016', 'MAT-CBI-01', 1600.0, 1600.0, 10000.00),
('PROCITEM-017', 'PROC-017', 'MAT-CBI-01', 1700.0, 1700.0, 10000.00),
('PROCITEM-018', 'PROC-018', 'MAT-CBI-01', 1800.0, 1800.0, 10000.00),
('PROCITEM-019', 'PROC-019', 'MAT-CBI-01', 1900.0, 1900.0, 10000.00),
('PROCITEM-020', 'PROC-020', 'MAT-CBI-01', 2000.0, 2000.0, 10000.00),
('PROCITEM-021', 'PROC-021', 'MAT-CBI-01', 2100.0, 2100.0, 10000.00),
('PROCITEM-022', 'PROC-022', 'MAT-CBI-01', 2200.0, 0.0, 10000.00),
('PROCITEM-023', 'PROC-023', 'MAT-CBI-01', 2300.0, 0.0, 10000.00),
('PROCITEM-024', 'PROC-024', 'MAT-CBI-01', 2400.0, 0.0, 10000.00),
('PROCITEM-025', 'PROC-025', 'MAT-CBI-01', 2500.0, 0.0, 10000.00);

-- Dumping data for table `tr_material_batch`
INSERT INTO `tr_material_batch` (`materialBatchId`, `materialId`, `warehouseId`, `batchNumber`, `quantity`, `productionDate`, `expirationDate`) VALUES
('MBATCH-001', 'MAT-CBI-01', 'WH-RAW-01', 'BATCH-RAW-CBI-001', 210.0, '2026-06-01', '2026-06-11'),
('MBATCH-002', 'MAT-CBI-01', 'WH-RAW-01', 'BATCH-RAW-CBI-002', 220.0, '2026-06-01', '2026-06-12'),
('MBATCH-003', 'MAT-CBI-01', 'WH-RAW-01', 'BATCH-RAW-CBI-003', 230.0, '2026-06-01', '2026-06-13'),
('MBATCH-004', 'MAT-CBI-01', 'WH-RAW-01', 'BATCH-RAW-CBI-004', 240.0, '2026-06-01', '2026-06-14'),
('MBATCH-005', 'MAT-CBI-01', 'WH-RAW-01', 'BATCH-RAW-CBI-005', 250.0, '2026-06-01', '2026-06-15'),
('MBATCH-006', 'MAT-CBI-01', 'WH-RAW-01', 'BATCH-RAW-CBI-006', 260.0, '2026-06-01', '2026-06-16'),
('MBATCH-007', 'MAT-CBI-01', 'WH-RAW-01', 'BATCH-RAW-CBI-007', 270.0, '2026-06-01', '2026-06-17'),
('MBATCH-008', 'MAT-CBI-01', 'WH-RAW-01', 'BATCH-RAW-CBI-008', 280.0, '2026-06-01', '2026-06-18'),
('MBATCH-009', 'MAT-CBI-01', 'WH-RAW-01', 'BATCH-RAW-CBI-009', 290.0, '2026-06-01', '2026-06-19'),
('MBATCH-010', 'MAT-CBI-01', 'WH-RAW-01', 'BATCH-RAW-CBI-010', 300.0, '2026-06-01', '2026-06-20'),
('MBATCH-011', 'MAT-CBI-01', 'WH-RAW-01', 'BATCH-RAW-CBI-011', 310.0, '2026-06-01', '2026-06-21'),
('MBATCH-012', 'MAT-CBI-01', 'WH-RAW-01', 'BATCH-RAW-CBI-012', 320.0, '2026-06-01', '2026-06-22'),
('MBATCH-013', 'MAT-CBI-01', 'WH-RAW-01', 'BATCH-RAW-CBI-013', 330.0, '2026-06-01', '2026-06-23'),
('MBATCH-014', 'MAT-CBI-01', 'WH-RAW-01', 'BATCH-RAW-CBI-014', 340.0, '2026-06-01', '2026-06-24'),
('MBATCH-015', 'MAT-CBI-01', 'WH-RAW-01', 'BATCH-RAW-CBI-015', 350.0, '2026-06-01', '2026-06-25'),
('MBATCH-016', 'MAT-CBI-01', 'WH-RAW-01', 'BATCH-RAW-CBI-016', 360.0, '2026-06-01', '2026-06-26'),
('MBATCH-017', 'MAT-CBI-01', 'WH-RAW-01', 'BATCH-RAW-CBI-017', 370.0, '2026-06-01', '2026-06-27'),
('MBATCH-018', 'MAT-CBI-01', 'WH-RAW-01', 'BATCH-RAW-CBI-018', 380.0, '2026-06-01', '2026-06-28'),
('MBATCH-019', 'MAT-CBI-01', 'WH-RAW-01', 'BATCH-RAW-CBI-019', 390.0, '2026-06-01', '2026-06-29'),
('MBATCH-020', 'MAT-CBI-01', 'WH-RAW-01', 'BATCH-RAW-CBI-020', 400.0, '2026-06-01', '2026-06-30'),
('MBATCH-021', 'MAT-CBI-01', 'WH-RAW-01', 'BATCH-RAW-CBI-021', 410.0, '2026-06-01', '2026-06-31'),
('MBATCH-022', 'MAT-CBI-01', 'WH-RAW-01', 'BATCH-RAW-CBI-022', 420.0, '2026-06-01', '2026-06-32'),
('MBATCH-023', 'MAT-CBI-01', 'WH-RAW-01', 'BATCH-RAW-CBI-023', 430.0, '2026-06-01', '2026-06-33'),
('MBATCH-024', 'MAT-CBI-01', 'WH-RAW-01', 'BATCH-RAW-CBI-024', 440.0, '2026-06-01', '2026-06-34'),
('MBATCH-025', 'MAT-CBI-01', 'WH-RAW-01', 'BATCH-RAW-CBI-025', 450.0, '2026-06-01', '2026-06-35');

-- Dumping data for table `tr_production_order`
INSERT INTO `tr_production_order` (`productionOrderId`, `employeeId`, `plannedDate`, `actualDate`, `status`, `qualityControlStatus`, `notes`) VALUES
('PRODORD-001', 'EMP-003', '2026-06-01 08:00:00', '2026-06-01 14:00:00', 'COMPLETED', 'PASSED', 'Masak batch produksi #001'),
('PRODORD-002', 'EMP-003', '2026-06-02 08:00:00', '2026-06-02 14:00:00', 'COMPLETED', 'PASSED', 'Masak batch produksi #002'),
('PRODORD-003', 'EMP-003', '2026-06-03 08:00:00', '2026-06-03 14:00:00', 'COMPLETED', 'PASSED', 'Masak batch produksi #003'),
('PRODORD-004', 'EMP-003', '2026-06-04 08:00:00', '2026-06-04 14:00:00', 'COMPLETED', 'PASSED', 'Masak batch produksi #004'),
('PRODORD-005', 'EMP-003', '2026-06-05 08:00:00', '2026-06-05 14:00:00', 'COMPLETED', 'PASSED', 'Masak batch produksi #005'),
('PRODORD-006', 'EMP-003', '2026-06-06 08:00:00', '2026-06-06 14:00:00', 'COMPLETED', 'PASSED', 'Masak batch produksi #006'),
('PRODORD-007', 'EMP-003', '2026-06-07 08:00:00', '2026-06-07 14:00:00', 'COMPLETED', 'PASSED', 'Masak batch produksi #007'),
('PRODORD-008', 'EMP-003', '2026-06-08 08:00:00', '2026-06-08 14:00:00', 'COMPLETED', 'PASSED', 'Masak batch produksi #008'),
('PRODORD-009', 'EMP-003', '2026-06-09 08:00:00', '2026-06-09 14:00:00', 'COMPLETED', 'PASSED', 'Masak batch produksi #009'),
('PRODORD-010', 'EMP-003', '2026-06-10 08:00:00', '2026-06-10 14:00:00', 'COMPLETED', 'PASSED', 'Masak batch produksi #010'),
('PRODORD-011', 'EMP-003', '2026-06-11 08:00:00', '2026-06-11 14:00:00', 'COMPLETED', 'PASSED', 'Masak batch produksi #011'),
('PRODORD-012', 'EMP-003', '2026-06-12 08:00:00', '2026-06-12 14:00:00', 'COMPLETED', 'PASSED', 'Masak batch produksi #012'),
('PRODORD-013', 'EMP-003', '2026-06-13 08:00:00', '2026-06-13 14:00:00', 'COMPLETED', 'PASSED', 'Masak batch produksi #013'),
('PRODORD-014', 'EMP-003', '2026-06-14 08:00:00', '2026-06-14 14:00:00', 'COMPLETED', 'PASSED', 'Masak batch produksi #014'),
('PRODORD-015', 'EMP-003', '2026-06-15 08:00:00', '2026-06-15 14:00:00', 'COMPLETED', 'PASSED', 'Masak batch produksi #015'),
('PRODORD-016', 'EMP-003', '2026-06-16 08:00:00', '2026-06-16 14:00:00', 'COMPLETED', 'PASSED', 'Masak batch produksi #016'),
('PRODORD-017', 'EMP-003', '2026-06-17 08:00:00', '2026-06-17 14:00:00', 'COMPLETED', 'PASSED', 'Masak batch produksi #017'),
('PRODORD-018', 'EMP-003', '2026-06-18 08:00:00', '2026-06-18 14:00:00', 'COMPLETED', 'PASSED', 'Masak batch produksi #018'),
('PRODORD-019', 'EMP-003', '2026-06-19 08:00:00', '2026-06-19 14:00:00', 'COMPLETED', 'PASSED', 'Masak batch produksi #019'),
('PRODORD-020', 'EMP-003', '2026-06-20 08:00:00', '2026-06-20 14:00:00', 'COMPLETED', 'PASSED', 'Masak batch produksi #020'),
('PRODORD-021', 'EMP-003', '2026-06-21 08:00:00', '2026-06-21 14:00:00', 'COMPLETED', 'PASSED', 'Masak batch produksi #021'),
('PRODORD-022', 'EMP-003', '2026-06-22 08:00:00', '2026-06-22 14:00:00', 'COMPLETED', 'PASSED', 'Masak batch produksi #022'),
('PRODORD-023', 'EMP-003', '2026-06-23 08:00:00', '2026-06-23 14:00:00', 'IN_PROGRESS', 'PENDING', 'Masak batch produksi #023'),
('PRODORD-024', 'EMP-003', '2026-06-24 08:00:00', '2026-06-24 14:00:00', 'IN_PROGRESS', 'PENDING', 'Masak batch produksi #024'),
('PRODORD-025', 'EMP-003', '2026-06-25 08:00:00', '2026-06-25 14:00:00', 'IN_PROGRESS', 'PENDING', 'Masak batch produksi #025');

-- Dumping data for table `tr_production_material_usage`
INSERT INTO `tr_production_material_usage` (`materialUsageId`, `productionOrderId`, `materialBatchId`, `usedQuantity`) VALUES
('MATUSE-001', 'PRODORD-001', 'MBATCH-001', 101.0),
('MATUSE-002', 'PRODORD-002', 'MBATCH-002', 102.0),
('MATUSE-003', 'PRODORD-003', 'MBATCH-003', 103.0),
('MATUSE-004', 'PRODORD-004', 'MBATCH-004', 104.0),
('MATUSE-005', 'PRODORD-005', 'MBATCH-005', 105.0),
('MATUSE-006', 'PRODORD-006', 'MBATCH-006', 106.0),
('MATUSE-007', 'PRODORD-007', 'MBATCH-007', 107.0),
('MATUSE-008', 'PRODORD-008', 'MBATCH-008', 108.0),
('MATUSE-009', 'PRODORD-009', 'MBATCH-009', 109.0),
('MATUSE-010', 'PRODORD-010', 'MBATCH-010', 110.0),
('MATUSE-011', 'PRODORD-011', 'MBATCH-011', 111.0),
('MATUSE-012', 'PRODORD-012', 'MBATCH-012', 112.0),
('MATUSE-013', 'PRODORD-013', 'MBATCH-013', 113.0),
('MATUSE-014', 'PRODORD-014', 'MBATCH-014', 114.0),
('MATUSE-015', 'PRODORD-015', 'MBATCH-015', 115.0),
('MATUSE-016', 'PRODORD-016', 'MBATCH-016', 116.0),
('MATUSE-017', 'PRODORD-017', 'MBATCH-017', 117.0),
('MATUSE-018', 'PRODORD-018', 'MBATCH-018', 118.0),
('MATUSE-019', 'PRODORD-019', 'MBATCH-019', 119.0),
('MATUSE-020', 'PRODORD-020', 'MBATCH-020', 120.0),
('MATUSE-021', 'PRODORD-021', 'MBATCH-021', 121.0),
('MATUSE-022', 'PRODORD-022', 'MBATCH-022', 122.0),
('MATUSE-023', 'PRODORD-023', 'MBATCH-023', 123.0),
('MATUSE-024', 'PRODORD-024', 'MBATCH-024', 124.0),
('MATUSE-025', 'PRODORD-025', 'MBATCH-025', 125.0);

-- Dumping data for table `tr_product_batch`
INSERT INTO `tr_product_batch` (`productBatchId`, `productId`, `warehouseId`, `batchNumber`, `quantity`, `productionDate`, `expirationDate`) VALUES
('PBATCH-001', 'PROD-001', 'WH-FIN-01', 'BATCH-FIN-SMBL-001', 1050, '2026-06-01', '2027-06-01'),
('PBATCH-002', 'PROD-001', 'WH-FIN-01', 'BATCH-FIN-SMBL-002', 1100, '2026-06-02', '2027-06-02'),
('PBATCH-003', 'PROD-001', 'WH-FIN-01', 'BATCH-FIN-SMBL-003', 1150, '2026-06-03', '2027-06-03'),
('PBATCH-004', 'PROD-001', 'WH-FIN-01', 'BATCH-FIN-SMBL-004', 1200, '2026-06-04', '2027-06-04'),
('PBATCH-005', 'PROD-001', 'WH-FIN-01', 'BATCH-FIN-SMBL-005', 1250, '2026-06-05', '2027-06-05'),
('PBATCH-006', 'PROD-001', 'WH-FIN-01', 'BATCH-FIN-SMBL-006', 1300, '2026-06-06', '2027-06-06'),
('PBATCH-007', 'PROD-001', 'WH-FIN-01', 'BATCH-FIN-SMBL-007', 1350, '2026-06-07', '2027-06-07'),
('PBATCH-008', 'PROD-001', 'WH-FIN-01', 'BATCH-FIN-SMBL-008', 1400, '2026-06-08', '2027-06-08'),
('PBATCH-009', 'PROD-001', 'WH-FIN-01', 'BATCH-FIN-SMBL-009', 1450, '2026-06-09', '2027-06-09'),
('PBATCH-010', 'PROD-001', 'WH-FIN-01', 'BATCH-FIN-SMBL-010', 1500, '2026-06-10', '2027-06-10'),
('PBATCH-011', 'PROD-001', 'WH-FIN-01', 'BATCH-FIN-SMBL-011', 1550, '2026-06-11', '2027-06-11'),
('PBATCH-012', 'PROD-001', 'WH-FIN-01', 'BATCH-FIN-SMBL-012', 1600, '2026-06-12', '2027-06-12'),
('PBATCH-013', 'PROD-001', 'WH-FIN-01', 'BATCH-FIN-SMBL-013', 1650, '2026-06-13', '2027-06-13'),
('PBATCH-014', 'PROD-001', 'WH-FIN-01', 'BATCH-FIN-SMBL-014', 1700, '2026-06-14', '2027-06-14'),
('PBATCH-015', 'PROD-001', 'WH-FIN-01', 'BATCH-FIN-SMBL-015', 1750, '2026-06-15', '2027-06-15'),
('PBATCH-016', 'PROD-001', 'WH-FIN-01', 'BATCH-FIN-SMBL-016', 1800, '2026-06-16', '2027-06-16'),
('PBATCH-017', 'PROD-001', 'WH-FIN-01', 'BATCH-FIN-SMBL-017', 1850, '2026-06-17', '2027-06-17'),
('PBATCH-018', 'PROD-001', 'WH-FIN-01', 'BATCH-FIN-SMBL-018', 1900, '2026-06-18', '2027-06-18'),
('PBATCH-019', 'PROD-001', 'WH-FIN-01', 'BATCH-FIN-SMBL-019', 1950, '2026-06-19', '2027-06-19'),
('PBATCH-020', 'PROD-001', 'WH-FIN-01', 'BATCH-FIN-SMBL-020', 2000, '2026-06-20', '2027-06-20'),
('PBATCH-021', 'PROD-001', 'WH-FIN-01', 'BATCH-FIN-SMBL-021', 2050, '2026-06-21', '2027-06-21'),
('PBATCH-022', 'PROD-001', 'WH-FIN-01', 'BATCH-FIN-SMBL-022', 2100, '2026-06-22', '2027-06-22'),
('PBATCH-023', 'PROD-001', 'WH-FIN-01', 'BATCH-FIN-SMBL-023', 2150, '2026-06-23', '2027-06-23'),
('PBATCH-024', 'PROD-001', 'WH-FIN-01', 'BATCH-FIN-SMBL-024', 2200, '2026-06-24', '2027-06-24'),
('PBATCH-025', 'PROD-001', 'WH-FIN-01', 'BATCH-FIN-SMBL-025', 2250, '2026-06-25', '2027-06-25');

-- Dumping data for table `tr_production_result`
INSERT INTO `tr_production_result` (`productionResultId`, `productionOrderId`, `productBatchId`, `producedQuantity`, `rejectedQuantity`) VALUES
('PRODRES-001', 'PRODORD-001', 'PBATCH-001', 1050, 1),
('PRODRES-002', 'PRODORD-002', 'PBATCH-002', 1100, 2),
('PRODRES-003', 'PRODORD-003', 'PBATCH-003', 1150, 3),
('PRODRES-004', 'PRODORD-004', 'PBATCH-004', 1200, 4),
('PRODRES-005', 'PRODORD-005', 'PBATCH-005', 1250, 5),
('PRODRES-006', 'PRODORD-006', 'PBATCH-006', 1300, 6),
('PRODRES-007', 'PRODORD-007', 'PBATCH-007', 1350, 7),
('PRODRES-008', 'PRODORD-008', 'PBATCH-008', 1400, 8),
('PRODRES-009', 'PRODORD-009', 'PBATCH-009', 1450, 9),
('PRODRES-010', 'PRODORD-010', 'PBATCH-010', 1500, 10),
('PRODRES-011', 'PRODORD-011', 'PBATCH-011', 1550, 11),
('PRODRES-012', 'PRODORD-012', 'PBATCH-012', 1600, 12),
('PRODRES-013', 'PRODORD-013', 'PBATCH-013', 1650, 13),
('PRODRES-014', 'PRODORD-014', 'PBATCH-014', 1700, 14),
('PRODRES-015', 'PRODORD-015', 'PBATCH-015', 1750, 15),
('PRODRES-016', 'PRODORD-016', 'PBATCH-016', 1800, 16),
('PRODRES-017', 'PRODORD-017', 'PBATCH-017', 1850, 17),
('PRODRES-018', 'PRODORD-018', 'PBATCH-018', 1900, 18),
('PRODRES-019', 'PRODORD-019', 'PBATCH-019', 1950, 19),
('PRODRES-020', 'PRODORD-020', 'PBATCH-020', 2000, 20),
('PRODRES-021', 'PRODORD-021', 'PBATCH-021', 2050, 21),
('PRODRES-022', 'PRODORD-022', 'PBATCH-022', 2100, 22),
('PRODRES-023', 'PRODORD-023', 'PBATCH-023', 2150, 23),
('PRODRES-024', 'PRODORD-024', 'PBATCH-024', 2200, 24),
('PRODRES-025', 'PRODORD-025', 'PBATCH-025', 2250, 25);

-- Dumping data for table `tr_order`
INSERT INTO `tr_order` (`orderId`, `customerId`, `addressId`, `taxId`, `channelId`, `agreementId`, `orderDate`, `status`, `clientPurchaseOrderNumber`, `subtotalAmount`, `shippingCost`, `discountAmount`, `taxAmount`, `grandTotalAmount`, `refundAmount`) VALUES
('ORDER-001', 'CUST-CORP-002', 'ADDR-CORP-002', 'TAX-PPN11', 'CHN-B2B', 'AGR-CORP-002', '2026-06-01 10:00:00', 'READY_TO_SHIP', 'PO-CLIENT-0001', 100000.0, 100000.00, 0.00, 11000.0, 111000.0, 0.00),
('ORDER-002', 'CUST-RET-003', 'ADDR-RET-003', 'TAX-PPN11', 'CHN-B2C', NULL, '2026-06-02 15:30:00', 'DELIVERED', NULL, 100000.0, 15000.00, 5000.00, 11000.0, 121000.0, 0.00),
('ORDER-003', 'CUST-CORP-004', 'ADDR-CORP-004', 'TAX-PPN11', 'CHN-B2B', 'AGR-CORP-004', '2026-06-03 10:00:00', 'READY_TO_SHIP', 'PO-CLIENT-0003', 300000.0, 100000.00, 0.00, 33000.0, 333000.0, 0.00),
('ORDER-004', 'CUST-RET-005', 'ADDR-RET-005', 'TAX-PPN11', 'CHN-B2C', NULL, '2026-06-04 15:30:00', 'DELIVERED', NULL, 200000.0, 15000.00, 5000.00, 22000.0, 242000.0, 0.00),
('ORDER-005', 'CUST-CORP-006', 'ADDR-CORP-006', 'TAX-PPN11', 'CHN-B2B', 'AGR-CORP-006', '2026-06-05 10:00:00', 'READY_TO_SHIP', 'PO-CLIENT-0005', 500000.0, 100000.00, 0.00, 55000.0, 555000.0, 0.00),
('ORDER-006', 'CUST-RET-007', 'ADDR-RET-007', 'TAX-PPN11', 'CHN-B2C', NULL, '2026-06-06 15:30:00', 'DELIVERED', NULL, 300000.0, 15000.00, 5000.00, 33000.0, 363000.0, 0.00),
('ORDER-007', 'CUST-CORP-008', 'ADDR-CORP-008', 'TAX-PPN11', 'CHN-B2B', 'AGR-CORP-008', '2026-06-07 10:00:00', 'READY_TO_SHIP', 'PO-CLIENT-0007', 700000.0, 100000.00, 0.00, 77000.0, 777000.0, 0.00),
('ORDER-008', 'CUST-RET-009', 'ADDR-RET-009', 'TAX-PPN11', 'CHN-B2C', NULL, '2026-06-08 15:30:00', 'DELIVERED', NULL, 400000.0, 15000.00, 5000.00, 44000.0, 484000.0, 0.00),
('ORDER-009', 'CUST-CORP-010', 'ADDR-CORP-010', 'TAX-PPN11', 'CHN-B2B', 'AGR-CORP-010', '2026-06-09 10:00:00', 'READY_TO_SHIP', 'PO-CLIENT-0009', 900000.0, 100000.00, 0.00, 99000.0, 999000.0, 0.00),
('ORDER-010', 'CUST-RET-011', 'ADDR-RET-011', 'TAX-PPN11', 'CHN-B2C', NULL, '2026-06-10 15:30:00', 'DELIVERED', NULL, 500000.0, 15000.00, 5000.00, 55000.0, 605000.0, 0.00),
('ORDER-011', 'CUST-CORP-012', 'ADDR-CORP-012', 'TAX-PPN11', 'CHN-B2B', 'AGR-CORP-012', '2026-06-11 10:00:00', 'READY_TO_SHIP', 'PO-CLIENT-0011', 1100000.0, 100000.00, 0.00, 121000.0, 1221000.0, 0.00),
('ORDER-012', 'CUST-RET-001', 'ADDR-RET-001', 'TAX-PPN11', 'CHN-B2C', NULL, '2026-06-12 15:30:00', 'DELIVERED', NULL, 600000.0, 15000.00, 5000.00, 66000.0, 726000.0, 0.00),
('ORDER-013', 'CUST-CORP-002', 'ADDR-CORP-002', 'TAX-PPN11', 'CHN-B2B', 'AGR-CORP-002', '2026-06-13 10:00:00', 'READY_TO_SHIP', 'PO-CLIENT-0013', 1300000.0, 100000.00, 0.00, 143000.0, 1443000.0, 0.00),
('ORDER-014', 'CUST-RET-003', 'ADDR-RET-003', 'TAX-PPN11', 'CHN-B2C', NULL, '2026-06-14 15:30:00', 'DELIVERED', NULL, 700000.0, 15000.00, 5000.00, 77000.0, 847000.0, 0.00),
('ORDER-015', 'CUST-CORP-004', 'ADDR-CORP-004', 'TAX-PPN11', 'CHN-B2B', 'AGR-CORP-004', '2026-06-15 10:00:00', 'READY_TO_SHIP', 'PO-CLIENT-0015', 1500000.0, 100000.00, 0.00, 165000.0, 1665000.0, 0.00),
('ORDER-016', 'CUST-RET-005', 'ADDR-RET-005', 'TAX-PPN11', 'CHN-B2C', NULL, '2026-06-16 15:30:00', 'DELIVERED', NULL, 800000.0, 15000.00, 5000.00, 88000.0, 968000.0, 0.00),
('ORDER-017', 'CUST-CORP-006', 'ADDR-CORP-006', 'TAX-PPN11', 'CHN-B2B', 'AGR-CORP-006', '2026-06-17 10:00:00', 'READY_TO_SHIP', 'PO-CLIENT-0017', 1700000.0, 100000.00, 0.00, 187000.0, 1887000.0, 0.00),
('ORDER-018', 'CUST-RET-007', 'ADDR-RET-007', 'TAX-PPN11', 'CHN-B2C', NULL, '2026-06-18 15:30:00', 'DELIVERED', NULL, 900000.0, 15000.00, 5000.00, 99000.0, 1089000.0, 0.00),
('ORDER-019', 'CUST-CORP-008', 'ADDR-CORP-008', 'TAX-PPN11', 'CHN-B2B', 'AGR-CORP-008', '2026-06-19 10:00:00', 'READY_TO_SHIP', 'PO-CLIENT-0019', 1900000.0, 100000.00, 0.00, 209000.0, 2109000.0, 0.00),
('ORDER-020', 'CUST-RET-009', 'ADDR-RET-009', 'TAX-PPN11', 'CHN-B2C', NULL, '2026-06-20 15:30:00', 'DELIVERED', NULL, 1000000.0, 15000.00, 5000.00, 110000.0, 1210000.0, 0.00),
('ORDER-021', 'CUST-CORP-010', 'ADDR-CORP-010', 'TAX-PPN11', 'CHN-B2B', 'AGR-CORP-010', '2026-06-21 10:00:00', 'READY_TO_SHIP', 'PO-CLIENT-0021', 2100000.0, 100000.00, 0.00, 231000.0, 2331000.0, 0.00),
('ORDER-022', 'CUST-RET-011', 'ADDR-RET-011', 'TAX-PPN11', 'CHN-B2C', NULL, '2026-06-22 15:30:00', 'DELIVERED', NULL, 1100000.0, 15000.00, 5000.00, 121000.0, 1331000.0, 0.00),
('ORDER-023', 'CUST-CORP-012', 'ADDR-CORP-012', 'TAX-PPN11', 'CHN-B2B', 'AGR-CORP-012', '2026-06-23 10:00:00', 'READY_TO_SHIP', 'PO-CLIENT-0023', 2300000.0, 100000.00, 0.00, 253000.0, 2553000.0, 0.00),
('ORDER-024', 'CUST-RET-001', 'ADDR-RET-001', 'TAX-PPN11', 'CHN-B2C', NULL, '2026-06-24 15:30:00', 'DELIVERED', NULL, 1200000.0, 15000.00, 5000.00, 132000.0, 1452000.0, 0.00),
('ORDER-025', 'CUST-CORP-002', 'ADDR-CORP-002', 'TAX-PPN11', 'CHN-B2B', 'AGR-CORP-002', '2026-06-25 10:00:00', 'READY_TO_SHIP', 'PO-CLIENT-0025', 2500000.0, 100000.00, 0.00, 275000.0, 2775000.0, 0.00);

-- Dumping data for table `tr_order_item`
INSERT INTO `tr_order_item` (`orderItemId`, `orderId`, `productId`, `quantity`, `price`, `subtotalAmount`, `itemNotes`) VALUES
('ORDERITEM-001', 'ORDER-001', 'PROD-001', 1, 12000.00, 12000.0, 'Catatan item order #1'),
('ORDERITEM-002', 'ORDER-002', 'PROD-001', 2, 12000.00, 24000.0, 'Catatan item order #2'),
('ORDERITEM-003', 'ORDER-003', 'PROD-001', 3, 12000.00, 36000.0, 'Catatan item order #3'),
('ORDERITEM-004', 'ORDER-004', 'PROD-001', 4, 12000.00, 48000.0, 'Catatan item order #4'),
('ORDERITEM-005', 'ORDER-005', 'PROD-001', 5, 12000.00, 60000.0, 'Catatan item order #5'),
('ORDERITEM-006', 'ORDER-006', 'PROD-001', 6, 12000.00, 72000.0, 'Catatan item order #6'),
('ORDERITEM-007', 'ORDER-007', 'PROD-001', 7, 12000.00, 84000.0, 'Catatan item order #7'),
('ORDERITEM-008', 'ORDER-008', 'PROD-001', 8, 12000.00, 96000.0, 'Catatan item order #8'),
('ORDERITEM-009', 'ORDER-009', 'PROD-001', 9, 12000.00, 108000.0, 'Catatan item order #9'),
('ORDERITEM-010', 'ORDER-010', 'PROD-001', 10, 12000.00, 120000.0, 'Catatan item order #10'),
('ORDERITEM-011', 'ORDER-011', 'PROD-001', 11, 12000.00, 132000.0, 'Catatan item order #11'),
('ORDERITEM-012', 'ORDER-012', 'PROD-001', 12, 12000.00, 144000.0, 'Catatan item order #12'),
('ORDERITEM-013', 'ORDER-013', 'PROD-001', 13, 12000.00, 156000.0, 'Catatan item order #13'),
('ORDERITEM-014', 'ORDER-014', 'PROD-001', 14, 12000.00, 168000.0, 'Catatan item order #14'),
('ORDERITEM-015', 'ORDER-015', 'PROD-001', 15, 12000.00, 180000.0, 'Catatan item order #15'),
('ORDERITEM-016', 'ORDER-016', 'PROD-001', 16, 12000.00, 192000.0, 'Catatan item order #16'),
('ORDERITEM-017', 'ORDER-017', 'PROD-001', 17, 12000.00, 204000.0, 'Catatan item order #17'),
('ORDERITEM-018', 'ORDER-018', 'PROD-001', 18, 12000.00, 216000.0, 'Catatan item order #18'),
('ORDERITEM-019', 'ORDER-019', 'PROD-001', 19, 12000.00, 228000.0, 'Catatan item order #19'),
('ORDERITEM-020', 'ORDER-020', 'PROD-001', 20, 12000.00, 240000.0, 'Catatan item order #20'),
('ORDERITEM-021', 'ORDER-021', 'PROD-001', 21, 12000.00, 252000.0, 'Catatan item order #21'),
('ORDERITEM-022', 'ORDER-022', 'PROD-001', 22, 12000.00, 264000.0, 'Catatan item order #22'),
('ORDERITEM-023', 'ORDER-023', 'PROD-001', 23, 12000.00, 276000.0, 'Catatan item order #23'),
('ORDERITEM-024', 'ORDER-024', 'PROD-001', 24, 12000.00, 288000.0, 'Catatan item order #24'),
('ORDERITEM-025', 'ORDER-025', 'PROD-001', 25, 12000.00, 300000.0, 'Catatan item order #25');

-- Dumping data for table `tr_payment`
INSERT INTO `tr_payment` (`paymentId`, `orderId`, `paymentMethodId`, `paymentDate`, `paidAmount`, `status`, `referenceNumber`) VALUES
('PAY-001', 'ORDER-001', 'PAY-TRANSFER', '2026-06-01 11:00:00', 111000.0, 'SUCCESS', 'REF-TX-000001'),
('PAY-002', 'ORDER-002', 'PAY-TRANSFER', '2026-06-02 11:00:00', 121000.0, 'SUCCESS', 'REF-TX-000002'),
('PAY-003', 'ORDER-003', 'PAY-TRANSFER', '2026-06-03 11:00:00', 333000.0, 'SUCCESS', 'REF-TX-000003'),
('PAY-004', 'ORDER-004', 'PAY-TRANSFER', '2026-06-04 11:00:00', 242000.0, 'SUCCESS', 'REF-TX-000004'),
('PAY-005', 'ORDER-005', 'PAY-TRANSFER', '2026-06-05 11:00:00', 555000.0, 'SUCCESS', 'REF-TX-000005'),
('PAY-006', 'ORDER-006', 'PAY-TRANSFER', '2026-06-06 11:00:00', 363000.0, 'SUCCESS', 'REF-TX-000006'),
('PAY-007', 'ORDER-007', 'PAY-TRANSFER', '2026-06-07 11:00:00', 777000.0, 'SUCCESS', 'REF-TX-000007'),
('PAY-008', 'ORDER-008', 'PAY-TRANSFER', '2026-06-08 11:00:00', 484000.0, 'SUCCESS', 'REF-TX-000008'),
('PAY-009', 'ORDER-009', 'PAY-TRANSFER', '2026-06-09 11:00:00', 999000.0, 'SUCCESS', 'REF-TX-000009'),
('PAY-010', 'ORDER-010', 'PAY-TRANSFER', '2026-06-10 11:00:00', 605000.0, 'SUCCESS', 'REF-TX-000010'),
('PAY-011', 'ORDER-011', 'PAY-TRANSFER', '2026-06-11 11:00:00', 1221000.0, 'SUCCESS', 'REF-TX-000011'),
('PAY-012', 'ORDER-012', 'PAY-TRANSFER', '2026-06-12 11:00:00', 726000.0, 'SUCCESS', 'REF-TX-000012'),
('PAY-013', 'ORDER-013', 'PAY-TRANSFER', '2026-06-13 11:00:00', 1443000.0, 'SUCCESS', 'REF-TX-000013'),
('PAY-014', 'ORDER-014', 'PAY-TRANSFER', '2026-06-14 11:00:00', 847000.0, 'SUCCESS', 'REF-TX-000014'),
('PAY-015', 'ORDER-015', 'PAY-TRANSFER', '2026-06-15 11:00:00', 1665000.0, 'SUCCESS', 'REF-TX-000015'),
('PAY-016', 'ORDER-016', 'PAY-TRANSFER', '2026-06-16 11:00:00', 968000.0, 'SUCCESS', 'REF-TX-000016'),
('PAY-017', 'ORDER-017', 'PAY-TRANSFER', '2026-06-17 11:00:00', 1887000.0, 'SUCCESS', 'REF-TX-000017'),
('PAY-018', 'ORDER-018', 'PAY-TRANSFER', '2026-06-18 11:00:00', 1089000.0, 'SUCCESS', 'REF-TX-000018'),
('PAY-019', 'ORDER-019', 'PAY-TRANSFER', '2026-06-19 11:00:00', 2109000.0, 'SUCCESS', 'REF-TX-000019'),
('PAY-020', 'ORDER-020', 'PAY-TRANSFER', '2026-06-20 11:00:00', 1210000.0, 'SUCCESS', 'REF-TX-000020'),
('PAY-021', 'ORDER-021', 'PAY-TRANSFER', '2026-06-21 11:00:00', 2331000.0, 'SUCCESS', 'REF-TX-000021'),
('PAY-022', 'ORDER-022', 'PAY-TRANSFER', '2026-06-22 11:00:00', 1331000.0, 'SUCCESS', 'REF-TX-000022'),
('PAY-023', 'ORDER-023', 'PAY-TRANSFER', '2026-06-23 11:00:00', 2553000.0, 'SUCCESS', 'REF-TX-000023'),
('PAY-024', 'ORDER-024', 'PAY-TRANSFER', '2026-06-24 11:00:00', 1452000.0, 'PENDING', 'REF-TX-000024'),
('PAY-025', 'ORDER-025', 'PAY-TRANSFER', '2026-06-25 11:00:00', 2775000.0, 'PENDING', 'REF-TX-000025');

-- Dumping data for table `tr_shipment`
INSERT INTO `tr_shipment` (`shipmentId`, `orderId`, `expeditionId`, `airwayBillNumber`, `status`, `estimatedDeliveryDate`) VALUES
('SHIP-001', 'ORDER-001', 'EXP-INTERNAL', 'AWB-KSFOOD-0001', 'MANIFESTED', '2026-06-02'),
('SHIP-002', 'ORDER-002', 'EXP-INTERNAL', 'AWB-KSFOOD-0002', 'DELIVERED', '2026-06-03'),
('SHIP-003', 'ORDER-003', 'EXP-INTERNAL', 'AWB-KSFOOD-0003', 'MANIFESTED', '2026-06-04'),
('SHIP-004', 'ORDER-004', 'EXP-INTERNAL', 'AWB-KSFOOD-0004', 'DELIVERED', '2026-06-05'),
('SHIP-005', 'ORDER-005', 'EXP-INTERNAL', 'AWB-KSFOOD-0005', 'MANIFESTED', '2026-06-06'),
('SHIP-006', 'ORDER-006', 'EXP-INTERNAL', 'AWB-KSFOOD-0006', 'DELIVERED', '2026-06-07'),
('SHIP-007', 'ORDER-007', 'EXP-INTERNAL', 'AWB-KSFOOD-0007', 'MANIFESTED', '2026-06-08'),
('SHIP-008', 'ORDER-008', 'EXP-INTERNAL', 'AWB-KSFOOD-0008', 'DELIVERED', '2026-06-09'),
('SHIP-009', 'ORDER-009', 'EXP-INTERNAL', 'AWB-KSFOOD-0009', 'MANIFESTED', '2026-06-10'),
('SHIP-010', 'ORDER-010', 'EXP-INTERNAL', 'AWB-KSFOOD-0010', 'DELIVERED', '2026-06-11'),
('SHIP-011', 'ORDER-011', 'EXP-INTERNAL', 'AWB-KSFOOD-0011', 'MANIFESTED', '2026-06-12'),
('SHIP-012', 'ORDER-012', 'EXP-INTERNAL', 'AWB-KSFOOD-0012', 'DELIVERED', '2026-06-13'),
('SHIP-013', 'ORDER-013', 'EXP-INTERNAL', 'AWB-KSFOOD-0013', 'MANIFESTED', '2026-06-14'),
('SHIP-014', 'ORDER-014', 'EXP-INTERNAL', 'AWB-KSFOOD-0014', 'DELIVERED', '2026-06-15'),
('SHIP-015', 'ORDER-015', 'EXP-INTERNAL', 'AWB-KSFOOD-0015', 'MANIFESTED', '2026-06-16'),
('SHIP-016', 'ORDER-016', 'EXP-INTERNAL', 'AWB-KSFOOD-0016', 'DELIVERED', '2026-06-17'),
('SHIP-017', 'ORDER-017', 'EXP-INTERNAL', 'AWB-KSFOOD-0017', 'MANIFESTED', '2026-06-18'),
('SHIP-018', 'ORDER-018', 'EXP-INTERNAL', 'AWB-KSFOOD-0018', 'DELIVERED', '2026-06-19'),
('SHIP-019', 'ORDER-019', 'EXP-INTERNAL', 'AWB-KSFOOD-0019', 'MANIFESTED', '2026-06-20'),
('SHIP-020', 'ORDER-020', 'EXP-INTERNAL', 'AWB-KSFOOD-0020', 'DELIVERED', '2026-06-21'),
('SHIP-021', 'ORDER-021', 'EXP-INTERNAL', 'AWB-KSFOOD-0021', 'MANIFESTED', '2026-06-22'),
('SHIP-022', 'ORDER-022', 'EXP-INTERNAL', 'AWB-KSFOOD-0022', 'DELIVERED', '2026-06-23'),
('SHIP-023', 'ORDER-023', 'EXP-INTERNAL', 'AWB-KSFOOD-0023', 'MANIFESTED', '2026-06-24'),
('SHIP-024', 'ORDER-024', 'EXP-INTERNAL', 'AWB-KSFOOD-0024', 'DELIVERED', '2026-06-25'),
('SHIP-025', 'ORDER-025', 'EXP-INTERNAL', 'AWB-KSFOOD-0025', 'MANIFESTED', '2026-06-26');

-- Dumping data for table `tr_cart`
INSERT INTO `tr_cart` (`cartId`, `customerId`, `isActive`) VALUES
('CART-001', 'CUST-RET-002', 0),
('CART-002', 'CUST-RET-003', 0),
('CART-003', 'CUST-RET-004', 0),
('CART-004', 'CUST-RET-005', 0),
('CART-005', 'CUST-RET-006', 0),
('CART-006', 'CUST-RET-007', 1),
('CART-007', 'CUST-RET-008', 1),
('CART-008', 'CUST-RET-009', 1),
('CART-009', 'CUST-RET-010', 1),
('CART-010', 'CUST-RET-011', 1),
('CART-011', 'CUST-RET-012', 1),
('CART-012', 'CUST-RET-001', 1),
('CART-013', 'CUST-RET-002', 1),
('CART-014', 'CUST-RET-003', 1),
('CART-015', 'CUST-RET-004', 1),
('CART-016', 'CUST-RET-005', 1),
('CART-017', 'CUST-RET-006', 1),
('CART-018', 'CUST-RET-007', 1),
('CART-019', 'CUST-RET-008', 1),
('CART-020', 'CUST-RET-009', 1),
('CART-021', 'CUST-RET-010', 1),
('CART-022', 'CUST-RET-011', 1),
('CART-023', 'CUST-RET-012', 1),
('CART-024', 'CUST-RET-001', 1),
('CART-025', 'CUST-RET-002', 1);

-- Dumping data for table `tr_cart_item`
INSERT INTO `tr_cart_item` (`cartItemId`, `cartId`, `productId`, `quantity`) VALUES
('CARTITEM-001', 'CART-001', 'PROD-001', 2),
('CARTITEM-002', 'CART-002', 'PROD-001', 3),
('CARTITEM-003', 'CART-003', 'PROD-001', 4),
('CARTITEM-004', 'CART-004', 'PROD-001', 5),
('CARTITEM-005', 'CART-005', 'PROD-001', 1),
('CARTITEM-006', 'CART-006', 'PROD-001', 2),
('CARTITEM-007', 'CART-007', 'PROD-001', 3),
('CARTITEM-008', 'CART-008', 'PROD-001', 4),
('CARTITEM-009', 'CART-009', 'PROD-001', 5),
('CARTITEM-010', 'CART-010', 'PROD-001', 1),
('CARTITEM-011', 'CART-011', 'PROD-001', 2),
('CARTITEM-012', 'CART-012', 'PROD-001', 3),
('CARTITEM-013', 'CART-013', 'PROD-001', 4),
('CARTITEM-014', 'CART-014', 'PROD-001', 5),
('CARTITEM-015', 'CART-015', 'PROD-001', 1),
('CARTITEM-016', 'CART-016', 'PROD-001', 2),
('CARTITEM-017', 'CART-017', 'PROD-001', 3),
('CARTITEM-018', 'CART-018', 'PROD-001', 4),
('CARTITEM-019', 'CART-019', 'PROD-001', 5),
('CARTITEM-020', 'CART-020', 'PROD-001', 1),
('CARTITEM-021', 'CART-021', 'PROD-001', 2),
('CARTITEM-022', 'CART-022', 'PROD-001', 3),
('CARTITEM-023', 'CART-023', 'PROD-001', 4),
('CARTITEM-024', 'CART-024', 'PROD-001', 5),
('CARTITEM-025', 'CART-025', 'PROD-001', 1);

-- Dumping data for table `tr_notification`
INSERT INTO `tr_notification` (`notificationId`, `userId`, `title`, `message`, `isRead`) VALUES
('NOTIF-001', 'USR-EMP001', 'Pemberitahuan Sistem #1', 'Pesan detail aktivitas transaksi ke-1.', 1),
('NOTIF-002', 'USR-EMP001', 'Pemberitahuan Sistem #2', 'Pesan detail aktivitas transaksi ke-2.', 0),
('NOTIF-003', 'USR-EMP001', 'Pemberitahuan Sistem #3', 'Pesan detail aktivitas transaksi ke-3.', 1),
('NOTIF-004', 'USR-EMP001', 'Pemberitahuan Sistem #4', 'Pesan detail aktivitas transaksi ke-4.', 0),
('NOTIF-005', 'USR-EMP001', 'Pemberitahuan Sistem #5', 'Pesan detail aktivitas transaksi ke-5.', 1),
('NOTIF-006', 'USR-EMP001', 'Pemberitahuan Sistem #6', 'Pesan detail aktivitas transaksi ke-6.', 0),
('NOTIF-007', 'USR-EMP001', 'Pemberitahuan Sistem #7', 'Pesan detail aktivitas transaksi ke-7.', 1),
('NOTIF-008', 'USR-EMP001', 'Pemberitahuan Sistem #8', 'Pesan detail aktivitas transaksi ke-8.', 0),
('NOTIF-009', 'USR-EMP001', 'Pemberitahuan Sistem #9', 'Pesan detail aktivitas transaksi ke-9.', 1),
('NOTIF-010', 'USR-EMP001', 'Pemberitahuan Sistem #10', 'Pesan detail aktivitas transaksi ke-10.', 0),
('NOTIF-011', 'USR-EMP001', 'Pemberitahuan Sistem #11', 'Pesan detail aktivitas transaksi ke-11.', 1),
('NOTIF-012', 'USR-EMP001', 'Pemberitahuan Sistem #12', 'Pesan detail aktivitas transaksi ke-12.', 0),
('NOTIF-013', 'USR-EMP001', 'Pemberitahuan Sistem #13', 'Pesan detail aktivitas transaksi ke-13.', 1),
('NOTIF-014', 'USR-EMP001', 'Pemberitahuan Sistem #14', 'Pesan detail aktivitas transaksi ke-14.', 0),
('NOTIF-015', 'USR-EMP001', 'Pemberitahuan Sistem #15', 'Pesan detail aktivitas transaksi ke-15.', 1),
('NOTIF-016', 'USR-EMP001', 'Pemberitahuan Sistem #16', 'Pesan detail aktivitas transaksi ke-16.', 0),
('NOTIF-017', 'USR-EMP001', 'Pemberitahuan Sistem #17', 'Pesan detail aktivitas transaksi ke-17.', 1),
('NOTIF-018', 'USR-EMP001', 'Pemberitahuan Sistem #18', 'Pesan detail aktivitas transaksi ke-18.', 0),
('NOTIF-019', 'USR-EMP001', 'Pemberitahuan Sistem #19', 'Pesan detail aktivitas transaksi ke-19.', 1),
('NOTIF-020', 'USR-EMP001', 'Pemberitahuan Sistem #20', 'Pesan detail aktivitas transaksi ke-20.', 0),
('NOTIF-021', 'USR-EMP001', 'Pemberitahuan Sistem #21', 'Pesan detail aktivitas transaksi ke-21.', 1),
('NOTIF-022', 'USR-EMP001', 'Pemberitahuan Sistem #22', 'Pesan detail aktivitas transaksi ke-22.', 0),
('NOTIF-023', 'USR-EMP001', 'Pemberitahuan Sistem #23', 'Pesan detail aktivitas transaksi ke-23.', 1),
('NOTIF-024', 'USR-EMP001', 'Pemberitahuan Sistem #24', 'Pesan detail aktivitas transaksi ke-24.', 0),
('NOTIF-025', 'USR-EMP001', 'Pemberitahuan Sistem #25', 'Pesan detail aktivitas transaksi ke-25.', 1);

-- Dumping data for table `tr_order_promo`
INSERT INTO `tr_order_promo` (`orderPromoId`, `orderId`, `promotionId`, `discountAmount`) VALUES
('ORDPROMO-001', 'ORDER-001', 'PROMO-001', 5000.0),
('ORDPROMO-002', 'ORDER-002', 'PROMO-001', 10000.0),
('ORDPROMO-003', 'ORDER-003', 'PROMO-001', 15000.0),
('ORDPROMO-004', 'ORDER-004', 'PROMO-001', 0.0),
('ORDPROMO-005', 'ORDER-005', 'PROMO-001', 5000.0),
('ORDPROMO-006', 'ORDER-006', 'PROMO-001', 10000.0),
('ORDPROMO-007', 'ORDER-007', 'PROMO-001', 15000.0),
('ORDPROMO-008', 'ORDER-008', 'PROMO-001', 0.0),
('ORDPROMO-009', 'ORDER-009', 'PROMO-001', 5000.0),
('ORDPROMO-010', 'ORDER-010', 'PROMO-001', 10000.0),
('ORDPROMO-011', 'ORDER-011', 'PROMO-001', 15000.0),
('ORDPROMO-012', 'ORDER-012', 'PROMO-001', 0.0),
('ORDPROMO-013', 'ORDER-013', 'PROMO-001', 5000.0),
('ORDPROMO-014', 'ORDER-014', 'PROMO-001', 10000.0),
('ORDPROMO-015', 'ORDER-015', 'PROMO-001', 15000.0),
('ORDPROMO-016', 'ORDER-016', 'PROMO-001', 0.0),
('ORDPROMO-017', 'ORDER-017', 'PROMO-001', 5000.0),
('ORDPROMO-018', 'ORDER-018', 'PROMO-001', 10000.0),
('ORDPROMO-019', 'ORDER-019', 'PROMO-001', 15000.0),
('ORDPROMO-020', 'ORDER-020', 'PROMO-001', 0.0),
('ORDPROMO-021', 'ORDER-021', 'PROMO-001', 5000.0),
('ORDPROMO-022', 'ORDER-022', 'PROMO-001', 10000.0),
('ORDPROMO-023', 'ORDER-023', 'PROMO-001', 15000.0),
('ORDPROMO-024', 'ORDER-024', 'PROMO-001', 0.0),
('ORDPROMO-025', 'ORDER-025', 'PROMO-001', 5000.0);

-- Dumping data for table `tr_product_review`
INSERT INTO `tr_product_review` (`reviewId`, `productId`, `customerId`, `orderId`, `rating`, `reviewComment`, `mediaUrl`, `isAnonymous`, `adminReply`) VALUES
('REV-001', 'PROD-001', 'CUST-RET-002', 'ORDER-001', 4, 'Ulasan produk ke-1 sangat memuaskan.', NULL, 0, 'Terima kasih atas ulasan dan ratingnya!'),
('REV-002', 'PROD-001', 'CUST-RET-003', 'ORDER-002', 5, 'Ulasan produk ke-2 sangat memuaskan.', NULL, 0, 'Terima kasih atas ulasan dan ratingnya!'),
('REV-003', 'PROD-001', 'CUST-RET-004', 'ORDER-003', 3, 'Ulasan produk ke-3 sangat memuaskan.', NULL, 0, 'Terima kasih atas ulasan dan ratingnya!'),
('REV-004', 'PROD-001', 'CUST-RET-005', 'ORDER-004', 4, 'Ulasan produk ke-4 sangat memuaskan.', NULL, 0, 'Terima kasih atas ulasan dan ratingnya!'),
('REV-005', 'PROD-001', 'CUST-RET-006', 'ORDER-005', 5, 'Ulasan produk ke-5 sangat memuaskan.', NULL, 0, 'Terima kasih atas ulasan dan ratingnya!'),
('REV-006', 'PROD-001', 'CUST-RET-007', 'ORDER-006', 3, 'Ulasan produk ke-6 sangat memuaskan.', NULL, 0, 'Terima kasih atas ulasan dan ratingnya!'),
('REV-007', 'PROD-001', 'CUST-RET-008', 'ORDER-007', 4, 'Ulasan produk ke-7 sangat memuaskan.', NULL, 0, 'Terima kasih atas ulasan dan ratingnya!'),
('REV-008', 'PROD-001', 'CUST-RET-009', 'ORDER-008', 5, 'Ulasan produk ke-8 sangat memuaskan.', NULL, 0, 'Terima kasih atas ulasan dan ratingnya!'),
('REV-009', 'PROD-001', 'CUST-RET-010', 'ORDER-009', 3, 'Ulasan produk ke-9 sangat memuaskan.', NULL, 0, 'Terima kasih atas ulasan dan ratingnya!'),
('REV-010', 'PROD-001', 'CUST-RET-011', 'ORDER-010', 4, 'Ulasan produk ke-10 sangat memuaskan.', NULL, 0, 'Terima kasih atas ulasan dan ratingnya!'),
('REV-011', 'PROD-001', 'CUST-RET-012', 'ORDER-011', 5, 'Ulasan produk ke-11 sangat memuaskan.', NULL, 0, 'Terima kasih atas ulasan dan ratingnya!'),
('REV-012', 'PROD-001', 'CUST-RET-001', 'ORDER-012', 3, 'Ulasan produk ke-12 sangat memuaskan.', NULL, 0, 'Terima kasih atas ulasan dan ratingnya!'),
('REV-013', 'PROD-001', 'CUST-RET-002', 'ORDER-013', 4, 'Ulasan produk ke-13 sangat memuaskan.', NULL, 0, 'Terima kasih atas ulasan dan ratingnya!'),
('REV-014', 'PROD-001', 'CUST-RET-003', 'ORDER-014', 5, 'Ulasan produk ke-14 sangat memuaskan.', NULL, 0, 'Terima kasih atas ulasan dan ratingnya!'),
('REV-015', 'PROD-001', 'CUST-RET-004', 'ORDER-015', 3, 'Ulasan produk ke-15 sangat memuaskan.', NULL, 0, 'Terima kasih atas ulasan dan ratingnya!'),
('REV-016', 'PROD-001', 'CUST-RET-005', 'ORDER-016', 4, 'Ulasan produk ke-16 sangat memuaskan.', NULL, 0, 'Terima kasih atas ulasan dan ratingnya!'),
('REV-017', 'PROD-001', 'CUST-RET-006', 'ORDER-017', 5, 'Ulasan produk ke-17 sangat memuaskan.', NULL, 0, 'Terima kasih atas ulasan dan ratingnya!'),
('REV-018', 'PROD-001', 'CUST-RET-007', 'ORDER-018', 3, 'Ulasan produk ke-18 sangat memuaskan.', NULL, 0, 'Terima kasih atas ulasan dan ratingnya!'),
('REV-019', 'PROD-001', 'CUST-RET-008', 'ORDER-019', 4, 'Ulasan produk ke-19 sangat memuaskan.', NULL, 0, 'Terima kasih atas ulasan dan ratingnya!'),
('REV-020', 'PROD-001', 'CUST-RET-009', 'ORDER-020', 5, 'Ulasan produk ke-20 sangat memuaskan.', NULL, 0, 'Terima kasih atas ulasan dan ratingnya!'),
('REV-021', 'PROD-001', 'CUST-RET-010', 'ORDER-021', 3, 'Ulasan produk ke-21 sangat memuaskan.', NULL, 0, 'Terima kasih atas ulasan dan ratingnya!'),
('REV-022', 'PROD-001', 'CUST-RET-011', 'ORDER-022', 4, 'Ulasan produk ke-22 sangat memuaskan.', NULL, 0, 'Terima kasih atas ulasan dan ratingnya!'),
('REV-023', 'PROD-001', 'CUST-RET-012', 'ORDER-023', 5, 'Ulasan produk ke-23 sangat memuaskan.', NULL, 0, 'Terima kasih atas ulasan dan ratingnya!'),
('REV-024', 'PROD-001', 'CUST-RET-001', 'ORDER-024', 3, 'Ulasan produk ke-24 sangat memuaskan.', NULL, 0, 'Terima kasih atas ulasan dan ratingnya!'),
('REV-025', 'PROD-001', 'CUST-RET-002', 'ORDER-025', 4, 'Ulasan produk ke-25 sangat memuaskan.', NULL, 0, 'Terima kasih atas ulasan dan ratingnya!');

-- Dumping data for table `tr_product_stock_movement`
INSERT INTO `tr_product_stock_movement` (`movementId`, `productBatchId`, `warehouseId`, `movementType`, `quantity`, `referenceType`, `referenceId`) VALUES
('MOVE-001', 'PBATCH-001', 'WH-FIN-01', 'IN', 1050, 'PRODUCTION', 'PRODRES-001'),
('MOVE-002', 'PBATCH-001', 'WH-FIN-01', 'OUT', 1, 'ORDER', 'ORDER-001'),
('MOVE-003', 'PBATCH-002', 'WH-FIN-01', 'IN', 1100, 'PRODUCTION', 'PRODRES-002'),
('MOVE-004', 'PBATCH-002', 'WH-FIN-01', 'OUT', 2, 'ORDER', 'ORDER-002'),
('MOVE-005', 'PBATCH-003', 'WH-FIN-01', 'IN', 1150, 'PRODUCTION', 'PRODRES-003'),
('MOVE-006', 'PBATCH-003', 'WH-FIN-01', 'OUT', 3, 'ORDER', 'ORDER-003'),
('MOVE-007', 'PBATCH-004', 'WH-FIN-01', 'IN', 1200, 'PRODUCTION', 'PRODRES-004'),
('MOVE-008', 'PBATCH-004', 'WH-FIN-01', 'OUT', 4, 'ORDER', 'ORDER-004'),
('MOVE-009', 'PBATCH-005', 'WH-FIN-01', 'IN', 1250, 'PRODUCTION', 'PRODRES-005'),
('MOVE-010', 'PBATCH-005', 'WH-FIN-01', 'OUT', 5, 'ORDER', 'ORDER-005'),
('MOVE-011', 'PBATCH-006', 'WH-FIN-01', 'IN', 1300, 'PRODUCTION', 'PRODRES-006'),
('MOVE-012', 'PBATCH-006', 'WH-FIN-01', 'OUT', 6, 'ORDER', 'ORDER-006'),
('MOVE-013', 'PBATCH-007', 'WH-FIN-01', 'IN', 1350, 'PRODUCTION', 'PRODRES-007'),
('MOVE-014', 'PBATCH-007', 'WH-FIN-01', 'OUT', 7, 'ORDER', 'ORDER-007'),
('MOVE-015', 'PBATCH-008', 'WH-FIN-01', 'IN', 1400, 'PRODUCTION', 'PRODRES-008'),
('MOVE-016', 'PBATCH-008', 'WH-FIN-01', 'OUT', 8, 'ORDER', 'ORDER-008'),
('MOVE-017', 'PBATCH-009', 'WH-FIN-01', 'IN', 1450, 'PRODUCTION', 'PRODRES-009'),
('MOVE-018', 'PBATCH-009', 'WH-FIN-01', 'OUT', 9, 'ORDER', 'ORDER-009'),
('MOVE-019', 'PBATCH-010', 'WH-FIN-01', 'IN', 1500, 'PRODUCTION', 'PRODRES-010'),
('MOVE-020', 'PBATCH-010', 'WH-FIN-01', 'OUT', 10, 'ORDER', 'ORDER-010'),
('MOVE-021', 'PBATCH-011', 'WH-FIN-01', 'IN', 1550, 'PRODUCTION', 'PRODRES-011'),
('MOVE-022', 'PBATCH-011', 'WH-FIN-01', 'OUT', 11, 'ORDER', 'ORDER-011'),
('MOVE-023', 'PBATCH-012', 'WH-FIN-01', 'IN', 1600, 'PRODUCTION', 'PRODRES-012'),
('MOVE-024', 'PBATCH-012', 'WH-FIN-01', 'OUT', 12, 'ORDER', 'ORDER-012'),
('MOVE-025', 'PBATCH-013', 'WH-FIN-01', 'IN', 1650, 'PRODUCTION', 'PRODRES-013'),
('MOVE-026', 'PBATCH-013', 'WH-FIN-01', 'OUT', 13, 'ORDER', 'ORDER-013'),
('MOVE-027', 'PBATCH-014', 'WH-FIN-01', 'IN', 1700, 'PRODUCTION', 'PRODRES-014'),
('MOVE-028', 'PBATCH-014', 'WH-FIN-01', 'OUT', 14, 'ORDER', 'ORDER-014'),
('MOVE-029', 'PBATCH-015', 'WH-FIN-01', 'IN', 1750, 'PRODUCTION', 'PRODRES-015'),
('MOVE-030', 'PBATCH-015', 'WH-FIN-01', 'OUT', 15, 'ORDER', 'ORDER-015'),
('MOVE-031', 'PBATCH-016', 'WH-FIN-01', 'IN', 1800, 'PRODUCTION', 'PRODRES-016'),
('MOVE-032', 'PBATCH-016', 'WH-FIN-01', 'OUT', 16, 'ORDER', 'ORDER-016'),
('MOVE-033', 'PBATCH-017', 'WH-FIN-01', 'IN', 1850, 'PRODUCTION', 'PRODRES-017'),
('MOVE-034', 'PBATCH-017', 'WH-FIN-01', 'OUT', 17, 'ORDER', 'ORDER-017'),
('MOVE-035', 'PBATCH-018', 'WH-FIN-01', 'IN', 1900, 'PRODUCTION', 'PRODRES-018'),
('MOVE-036', 'PBATCH-018', 'WH-FIN-01', 'OUT', 18, 'ORDER', 'ORDER-018'),
('MOVE-037', 'PBATCH-019', 'WH-FIN-01', 'IN', 1950, 'PRODUCTION', 'PRODRES-019'),
('MOVE-038', 'PBATCH-019', 'WH-FIN-01', 'OUT', 19, 'ORDER', 'ORDER-019'),
('MOVE-039', 'PBATCH-020', 'WH-FIN-01', 'IN', 2000, 'PRODUCTION', 'PRODRES-020'),
('MOVE-040', 'PBATCH-020', 'WH-FIN-01', 'OUT', 20, 'ORDER', 'ORDER-020'),
('MOVE-041', 'PBATCH-021', 'WH-FIN-01', 'IN', 2050, 'PRODUCTION', 'PRODRES-021'),
('MOVE-042', 'PBATCH-021', 'WH-FIN-01', 'OUT', 21, 'ORDER', 'ORDER-021'),
('MOVE-043', 'PBATCH-022', 'WH-FIN-01', 'IN', 2100, 'PRODUCTION', 'PRODRES-022'),
('MOVE-044', 'PBATCH-022', 'WH-FIN-01', 'OUT', 22, 'ORDER', 'ORDER-022'),
('MOVE-045', 'PBATCH-023', 'WH-FIN-01', 'IN', 2150, 'PRODUCTION', 'PRODRES-023'),
('MOVE-046', 'PBATCH-023', 'WH-FIN-01', 'OUT', 23, 'ORDER', 'ORDER-023'),
('MOVE-047', 'PBATCH-024', 'WH-FIN-01', 'IN', 2200, 'PRODUCTION', 'PRODRES-024'),
('MOVE-048', 'PBATCH-024', 'WH-FIN-01', 'OUT', 24, 'ORDER', 'ORDER-024'),
('MOVE-049', 'PBATCH-025', 'WH-FIN-01', 'IN', 2250, 'PRODUCTION', 'PRODRES-025'),
('MOVE-050', 'PBATCH-025', 'WH-FIN-01', 'OUT', 25, 'ORDER', 'ORDER-025');

-- Dumping data for table `tr_return`
INSERT INTO `tr_return` (`returnId`, `orderId`, `customerId`, `employeeId`, `status`, `resolutionType`, `customerNotes`, `adminNotes`) VALUES
('RET-001', 'ORDER-001', 'CUST-CORP-002', 'EMP-002', 'APPROVED', 'PRODUCT_REPLACEMENT', 'Botol pecah 1 biji.', 'Sudah diganti dengan batch baru.'),
('RET-002', 'ORDER-002', 'CUST-CORP-003', 'EMP-002', 'APPROVED', 'PRODUCT_REPLACEMENT', 'Botol pecah 2 biji.', 'Sudah diganti dengan batch baru.'),
('RET-003', 'ORDER-003', 'CUST-CORP-004', 'EMP-002', 'APPROVED', 'PRODUCT_REPLACEMENT', 'Botol pecah 3 biji.', 'Sudah diganti dengan batch baru.'),
('RET-004', 'ORDER-004', 'CUST-CORP-005', 'EMP-002', 'APPROVED', 'PRODUCT_REPLACEMENT', 'Botol pecah 4 biji.', 'Sudah diganti dengan batch baru.'),
('RET-005', 'ORDER-005', 'CUST-CORP-006', 'EMP-002', 'APPROVED', 'PRODUCT_REPLACEMENT', 'Botol pecah 5 biji.', 'Sudah diganti dengan batch baru.'),
('RET-006', 'ORDER-006', 'CUST-CORP-007', 'EMP-002', 'APPROVED', 'PRODUCT_REPLACEMENT', 'Botol pecah 6 biji.', 'Sudah diganti dengan batch baru.'),
('RET-007', 'ORDER-007', 'CUST-CORP-008', 'EMP-002', 'APPROVED', 'PRODUCT_REPLACEMENT', 'Botol pecah 7 biji.', 'Sudah diganti dengan batch baru.'),
('RET-008', 'ORDER-008', 'CUST-CORP-009', 'EMP-002', 'APPROVED', 'PRODUCT_REPLACEMENT', 'Botol pecah 8 biji.', 'Sudah diganti dengan batch baru.'),
('RET-009', 'ORDER-009', 'CUST-CORP-010', 'EMP-002', 'APPROVED', 'PRODUCT_REPLACEMENT', 'Botol pecah 9 biji.', 'Sudah diganti dengan batch baru.'),
('RET-010', 'ORDER-010', 'CUST-CORP-011', 'EMP-002', 'APPROVED', 'PRODUCT_REPLACEMENT', 'Botol pecah 10 biji.', 'Sudah diganti dengan batch baru.'),
('RET-011', 'ORDER-011', 'CUST-CORP-012', 'EMP-002', 'APPROVED', 'PRODUCT_REPLACEMENT', 'Botol pecah 11 biji.', 'Sudah diganti dengan batch baru.'),
('RET-012', 'ORDER-012', 'CUST-CORP-001', 'EMP-002', 'APPROVED', 'PRODUCT_REPLACEMENT', 'Botol pecah 12 biji.', 'Sudah diganti dengan batch baru.'),
('RET-013', 'ORDER-013', 'CUST-CORP-002', 'EMP-002', 'APPROVED', 'PRODUCT_REPLACEMENT', 'Botol pecah 13 biji.', 'Sudah diganti dengan batch baru.'),
('RET-014', 'ORDER-014', 'CUST-CORP-003', 'EMP-002', 'APPROVED', 'PRODUCT_REPLACEMENT', 'Botol pecah 14 biji.', 'Sudah diganti dengan batch baru.'),
('RET-015', 'ORDER-015', 'CUST-CORP-004', 'EMP-002', 'APPROVED', 'PRODUCT_REPLACEMENT', 'Botol pecah 15 biji.', 'Sudah diganti dengan batch baru.'),
('RET-016', 'ORDER-016', 'CUST-CORP-005', 'EMP-002', 'APPROVED', 'PRODUCT_REPLACEMENT', 'Botol pecah 16 biji.', 'Sudah diganti dengan batch baru.'),
('RET-017', 'ORDER-017', 'CUST-CORP-006', 'EMP-002', 'APPROVED', 'PRODUCT_REPLACEMENT', 'Botol pecah 17 biji.', 'Sudah diganti dengan batch baru.'),
('RET-018', 'ORDER-018', 'CUST-CORP-007', 'EMP-002', 'APPROVED', 'PRODUCT_REPLACEMENT', 'Botol pecah 18 biji.', 'Sudah diganti dengan batch baru.'),
('RET-019', 'ORDER-019', 'CUST-CORP-008', 'EMP-002', 'APPROVED', 'PRODUCT_REPLACEMENT', 'Botol pecah 19 biji.', 'Sudah diganti dengan batch baru.'),
('RET-020', 'ORDER-020', 'CUST-CORP-009', 'EMP-002', 'APPROVED', 'PRODUCT_REPLACEMENT', 'Botol pecah 20 biji.', 'Sudah diganti dengan batch baru.'),
('RET-021', 'ORDER-021', 'CUST-CORP-010', 'EMP-002', 'APPROVED', 'PRODUCT_REPLACEMENT', 'Botol pecah 21 biji.', 'Sudah diganti dengan batch baru.'),
('RET-022', 'ORDER-022', 'CUST-CORP-011', 'EMP-002', 'APPROVED', 'PRODUCT_REPLACEMENT', 'Botol pecah 22 biji.', 'Sudah diganti dengan batch baru.'),
('RET-023', 'ORDER-023', 'CUST-CORP-012', 'EMP-002', 'APPROVED', 'PRODUCT_REPLACEMENT', 'Botol pecah 23 biji.', 'Sudah diganti dengan batch baru.'),
('RET-024', 'ORDER-024', 'CUST-CORP-001', 'EMP-002', 'APPROVED', 'PRODUCT_REPLACEMENT', 'Botol pecah 24 biji.', 'Sudah diganti dengan batch baru.'),
('RET-025', 'ORDER-025', 'CUST-CORP-002', 'EMP-002', 'APPROVED', 'PRODUCT_REPLACEMENT', 'Botol pecah 25 biji.', 'Sudah diganti dengan batch baru.');

-- Dumping data for table `tr_return_item`
INSERT INTO `tr_return_item` (`returnItemId`, `returnId`, `orderItemId`, `returnedQuantity`, `returnReason`, `receivedCondition`) VALUES
('RETITEM-001', 'RET-001', 'ORDERITEM-001', 2, 'DAMAGED_PACKAGING', 'DESTROYED'),
('RETITEM-002', 'RET-002', 'ORDERITEM-002', 3, 'DAMAGED_PACKAGING', 'DESTROYED'),
('RETITEM-003', 'RET-003', 'ORDERITEM-003', 1, 'DAMAGED_PACKAGING', 'DESTROYED'),
('RETITEM-004', 'RET-004', 'ORDERITEM-004', 2, 'DAMAGED_PACKAGING', 'DESTROYED'),
('RETITEM-005', 'RET-005', 'ORDERITEM-005', 3, 'DAMAGED_PACKAGING', 'DESTROYED'),
('RETITEM-006', 'RET-006', 'ORDERITEM-006', 1, 'DAMAGED_PACKAGING', 'DESTROYED'),
('RETITEM-007', 'RET-007', 'ORDERITEM-007', 2, 'DAMAGED_PACKAGING', 'DESTROYED'),
('RETITEM-008', 'RET-008', 'ORDERITEM-008', 3, 'DAMAGED_PACKAGING', 'DESTROYED'),
('RETITEM-009', 'RET-009', 'ORDERITEM-009', 1, 'DAMAGED_PACKAGING', 'DESTROYED'),
('RETITEM-010', 'RET-010', 'ORDERITEM-010', 2, 'DAMAGED_PACKAGING', 'DESTROYED'),
('RETITEM-011', 'RET-011', 'ORDERITEM-011', 3, 'DAMAGED_PACKAGING', 'DESTROYED'),
('RETITEM-012', 'RET-012', 'ORDERITEM-012', 1, 'DAMAGED_PACKAGING', 'DESTROYED'),
('RETITEM-013', 'RET-013', 'ORDERITEM-013', 2, 'DAMAGED_PACKAGING', 'DESTROYED'),
('RETITEM-014', 'RET-014', 'ORDERITEM-014', 3, 'DAMAGED_PACKAGING', 'DESTROYED'),
('RETITEM-015', 'RET-015', 'ORDERITEM-015', 1, 'DAMAGED_PACKAGING', 'DESTROYED'),
('RETITEM-016', 'RET-016', 'ORDERITEM-016', 2, 'DAMAGED_PACKAGING', 'DESTROYED'),
('RETITEM-017', 'RET-017', 'ORDERITEM-017', 3, 'DAMAGED_PACKAGING', 'DESTROYED'),
('RETITEM-018', 'RET-018', 'ORDERITEM-018', 1, 'DAMAGED_PACKAGING', 'DESTROYED'),
('RETITEM-019', 'RET-019', 'ORDERITEM-019', 2, 'DAMAGED_PACKAGING', 'DESTROYED'),
('RETITEM-020', 'RET-020', 'ORDERITEM-020', 3, 'DAMAGED_PACKAGING', 'DESTROYED'),
('RETITEM-021', 'RET-021', 'ORDERITEM-021', 1, 'DAMAGED_PACKAGING', 'DESTROYED'),
('RETITEM-022', 'RET-022', 'ORDERITEM-022', 2, 'DAMAGED_PACKAGING', 'DESTROYED'),
('RETITEM-023', 'RET-023', 'ORDERITEM-023', 3, 'DAMAGED_PACKAGING', 'DESTROYED'),
('RETITEM-024', 'RET-024', 'ORDERITEM-024', 1, 'DAMAGED_PACKAGING', 'DESTROYED'),
('RETITEM-025', 'RET-025', 'ORDERITEM-025', 2, 'DAMAGED_PACKAGING', 'DESTROYED');

-- Dumping data for table `tr_stock_opname`
INSERT INTO `tr_stock_opname` (`opnameId`, `warehouseId`, `employeeId`, `status`, `notes`) VALUES
('OPN-001', 'WH-FIN-01', 'EMP-002', 'APPROVED', 'Opname stok bulanan ke-1'),
('OPN-002', 'WH-FIN-01', 'EMP-002', 'APPROVED', 'Opname stok bulanan ke-2'),
('OPN-003', 'WH-FIN-01', 'EMP-002', 'APPROVED', 'Opname stok bulanan ke-3'),
('OPN-004', 'WH-FIN-01', 'EMP-002', 'APPROVED', 'Opname stok bulanan ke-4'),
('OPN-005', 'WH-FIN-01', 'EMP-002', 'APPROVED', 'Opname stok bulanan ke-5'),
('OPN-006', 'WH-FIN-01', 'EMP-002', 'APPROVED', 'Opname stok bulanan ke-6'),
('OPN-007', 'WH-FIN-01', 'EMP-002', 'APPROVED', 'Opname stok bulanan ke-7'),
('OPN-008', 'WH-FIN-01', 'EMP-002', 'APPROVED', 'Opname stok bulanan ke-8'),
('OPN-009', 'WH-FIN-01', 'EMP-002', 'APPROVED', 'Opname stok bulanan ke-9'),
('OPN-010', 'WH-FIN-01', 'EMP-002', 'APPROVED', 'Opname stok bulanan ke-10'),
('OPN-011', 'WH-FIN-01', 'EMP-002', 'APPROVED', 'Opname stok bulanan ke-11'),
('OPN-012', 'WH-FIN-01', 'EMP-002', 'APPROVED', 'Opname stok bulanan ke-12'),
('OPN-013', 'WH-FIN-01', 'EMP-002', 'APPROVED', 'Opname stok bulanan ke-13'),
('OPN-014', 'WH-FIN-01', 'EMP-002', 'APPROVED', 'Opname stok bulanan ke-14'),
('OPN-015', 'WH-FIN-01', 'EMP-002', 'APPROVED', 'Opname stok bulanan ke-15'),
('OPN-016', 'WH-FIN-01', 'EMP-002', 'APPROVED', 'Opname stok bulanan ke-16'),
('OPN-017', 'WH-FIN-01', 'EMP-002', 'APPROVED', 'Opname stok bulanan ke-17'),
('OPN-018', 'WH-FIN-01', 'EMP-002', 'APPROVED', 'Opname stok bulanan ke-18'),
('OPN-019', 'WH-FIN-01', 'EMP-002', 'APPROVED', 'Opname stok bulanan ke-19'),
('OPN-020', 'WH-FIN-01', 'EMP-002', 'APPROVED', 'Opname stok bulanan ke-20'),
('OPN-021', 'WH-FIN-01', 'EMP-002', 'APPROVED', 'Opname stok bulanan ke-21'),
('OPN-022', 'WH-FIN-01', 'EMP-002', 'APPROVED', 'Opname stok bulanan ke-22'),
('OPN-023', 'WH-FIN-01', 'EMP-002', 'APPROVED', 'Opname stok bulanan ke-23'),
('OPN-024', 'WH-FIN-01', 'EMP-002', 'APPROVED', 'Opname stok bulanan ke-24'),
('OPN-025', 'WH-FIN-01', 'EMP-002', 'APPROVED', 'Opname stok bulanan ke-25');

-- Dumping data for table `tr_stock_opname_item`
INSERT INTO `tr_stock_opname_item` (`opnameItemId`, `opnameId`, `productBatchId`, `systemQuantity`, `actualQuantity`, `differenceQuantity`, `reason`) VALUES
('OPNITEM-001', 'OPN-001', 'PBATCH-001', 500, 499, -1, 'Selisih audit opname'),
('OPNITEM-002', 'OPN-002', 'PBATCH-002', 500, 500, 0, 'Selisih audit opname'),
('OPNITEM-003', 'OPN-003', 'PBATCH-003', 500, 499, -1, 'Selisih audit opname'),
('OPNITEM-004', 'OPN-004', 'PBATCH-004', 500, 500, 0, 'Selisih audit opname'),
('OPNITEM-005', 'OPN-005', 'PBATCH-005', 500, 499, -1, 'Selisih audit opname'),
('OPNITEM-006', 'OPN-006', 'PBATCH-006', 500, 500, 0, 'Selisih audit opname'),
('OPNITEM-007', 'OPN-007', 'PBATCH-007', 500, 499, -1, 'Selisih audit opname'),
('OPNITEM-008', 'OPN-008', 'PBATCH-008', 500, 500, 0, 'Selisih audit opname'),
('OPNITEM-009', 'OPN-009', 'PBATCH-009', 500, 499, -1, 'Selisih audit opname'),
('OPNITEM-010', 'OPN-010', 'PBATCH-010', 500, 500, 0, 'Selisih audit opname'),
('OPNITEM-011', 'OPN-011', 'PBATCH-011', 500, 499, -1, 'Selisih audit opname'),
('OPNITEM-012', 'OPN-012', 'PBATCH-012', 500, 500, 0, 'Selisih audit opname'),
('OPNITEM-013', 'OPN-013', 'PBATCH-013', 500, 499, -1, 'Selisih audit opname'),
('OPNITEM-014', 'OPN-014', 'PBATCH-014', 500, 500, 0, 'Selisih audit opname'),
('OPNITEM-015', 'OPN-015', 'PBATCH-015', 500, 499, -1, 'Selisih audit opname'),
('OPNITEM-016', 'OPN-016', 'PBATCH-016', 500, 500, 0, 'Selisih audit opname'),
('OPNITEM-017', 'OPN-017', 'PBATCH-017', 500, 499, -1, 'Selisih audit opname'),
('OPNITEM-018', 'OPN-018', 'PBATCH-018', 500, 500, 0, 'Selisih audit opname'),
('OPNITEM-019', 'OPN-019', 'PBATCH-019', 500, 499, -1, 'Selisih audit opname'),
('OPNITEM-020', 'OPN-020', 'PBATCH-020', 500, 500, 0, 'Selisih audit opname'),
('OPNITEM-021', 'OPN-021', 'PBATCH-021', 500, 499, -1, 'Selisih audit opname'),
('OPNITEM-022', 'OPN-022', 'PBATCH-022', 500, 500, 0, 'Selisih audit opname'),
('OPNITEM-023', 'OPN-023', 'PBATCH-023', 500, 499, -1, 'Selisih audit opname'),
('OPNITEM-024', 'OPN-024', 'PBATCH-024', 500, 500, 0, 'Selisih audit opname'),
('OPNITEM-025', 'OPN-025', 'PBATCH-025', 500, 499, -1, 'Selisih audit opname');

COMMIT;
