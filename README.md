# pdf-export

将任意网页导出为 PDF 的命令行工具。

## 安装

```bash
npm install -g pdf-export
```

安装时会自动下载 Chromium 浏览器。

如果 Chromium 下载失败，可以手动安装：

```bash
npx playwright install chromium
```

## 用法

```bash
pdf-export <url> [选项]
```

### 参数

| 参数 | 说明 |
|------|------|
| `url` | 要导出的网页地址（必填） |

### 选项

| 选项 | 默认值 | 说明 |
|------|--------|------|
| `-o, --output <路径>` | `./output.pdf` | 输出文件路径 |
| `-w, --wait <毫秒>` | `1000` | 页面加载后额外等待时间 |
| `-f, --format <尺寸>` | `A4` | PDF 纸张尺寸（如 A4、Letter） |
| `-l, --landscape` | `false` | 横向打印 |
| `--no-background` | `false` | 不打印背景色 |
| `-h, --help` | | 显示帮助信息 |

### 示例

```bash
# 基本用法
pdf-export https://example.com

# 自定义输出路径和纸张尺寸
pdf-export https://example.com -o report.pdf -f Letter

# 横向打印，增加等待时间
pdf-export https://example.com -l -w 3000
```

## 原理

基于 [Playwright](https://playwright.dev) 启动无头 Chromium 浏览器，访问目标网页并保存为 PDF。

## 环境要求

- Node.js >= 18

## 高级用法

如果需要指定自定义 Chrome 路径或库路径，可设置环境变量：

```bash
CHROME_PATH=/path/to/chrome CHROME_LIB_PATH=/path/to/libs pdf-export https://example.com
```
