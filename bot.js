const { config } = require("dotenv");
const { Telegraf } = require("telegraf");
config();
const path = require("path");
const fs = require("fs");
const { createReadStream } = require("fs");

const bot = new Telegraf(process.env.BOT_TOKEN);

const showMainMenu = (ctx) => {
  ctx.reply(
    "سلام ، به بازرگانی حسین پور خوش آمدید جهت ادامه لطفا یکی از گزینه هارا انتخاب کنید",
    {
      reply_markup: {
        keyboard: [[" چینی و بلور", "لوازم خانگی"]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    }
  );
};
bot.start((ctx) => showMainMenu(ctx));

bot.hears("لوازم خانگی", (ctx) =>
  ctx.reply("لطفا انتخاب کنید", {
    reply_markup: {
      keyboard: [
        ["کولر", "برقی"],
        ["ظرف شویی", "لباسشویی"],
        ["تلوزیون", "یخچال"],
        ["منو اصلی"],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  })
);
bot.hears("چینی و بلور", (ctx) =>
  ctx.reply("لطفا انتخاب کنید", {
    reply_markup: {
      keyboard: [
        ["سرویس چینی", "فله جات چینی"],
        ["آرکوپال", "دکوری"],
        ["قابلمه و تابه", "بلور"],
        ["استیل جات", "منو اصلی"],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  })
);
bot.hears("دکوری", (ctx) =>
  ctx.reply("لطفا انتخاب کنید", {
    reply_markup: {
      keyboard: [
        ["لردشید", "لمون"],
        ["گلدکیش", "باواریا"],
        ["دالتون سرامیک", "پاسماوری"],
        ["منو اصلی"],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  })
);
bot.hears("آرکوپال", (ctx) =>
  ctx.reply("لطفا انتخاب کنید", {
    reply_markup: {
      keyboard: [["مقصود", "پارس اپال"], ["فرانسه"], ["منو اصلی"]],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  })
);
bot.hears("بلور", (ctx) =>
  ctx.reply("لطفا انتخاب کنید", {
    reply_markup: {
      keyboard: [["پذیرایی", "پیرکس"], ["مصرفی"], ["منو اصلی"]],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  })
);
bot.hears("پذیرایی", (ctx) =>
  ctx.reply("لطفا انتخاب کنید", {
    reply_markup: {
      keyboard: [["ایرانی", "خارجی"], ["منو اصلی"]],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  })
);
bot.hears("مصرفی", (ctx) =>
  ctx.reply("لطفا انتخاب کنید", {
    reply_markup: {
      keyboard: [
        ["پارچ و لیوان", "کتری و قوری"],
        ["فنجان", "قندان"],
        ["منو اصلی"],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  })
);
bot.hears("قابلمه و تابه", (ctx) =>
  ctx.reply("لطفا انتخاب کنید", {
    reply_markup: {
      keyboard: [["چدن", "تفلون"], ["منو اصلی"]],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  })
);
bot.hears("تفلون", (ctx) =>
  ctx.reply("لطفا انتخاب کنید", {
    reply_markup: {
      keyboard: [["ماهان", "عروس تفلون"], ["منو اصلی"]],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  })
);
bot.hears("چدن", (ctx) =>
  ctx.reply("لطفا انتخاب کنید", {
    reply_markup: {
      keyboard: [["فله", "سرویس چدن"], ["منو اصلی"]],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  })
);
bot.hears("استیل جات", (ctx) =>
  ctx.reply("لطفا انتخاب کنید", {
    reply_markup: {
      keyboard: [
        ["کتری و قوری", "سماور"],
        ["فلاکس و کلمن", "قاشق چنگال ، کارد ، ابزار"],
        ["ظرف غذا", "پذیرایی استیل"],
        ["منو اصلی"],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  })
);
bot.hears("کولر", (ctx) => {
  ctx.reply("لطفا انتخاب کنید", {
    reply_markup: {
      keyboard: [
        ["جنرال گلد", "توربو"],
        ["زانتی", "ویربل"],
        ["جنرال آیس", "هایسنس"],
        ["ایوولی", "منو اصلی"],
      ],
    },
  });
});
{
  const lemonFolderPath = path.join(__dirname, "assets", "lemon");
  const sendAllImages = (ctx) => {
    fs.readdir(lemonFolderPath, (err, files) => {
      if (err) {
        console.error("خطا در خواندن پوشه:", err);
        return ctx.reply("❌ خطایی در خواندن تصاویر رخ داد.");
      }

      const imageFiles = files.filter((file) =>
        [".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(
          path.extname(file).toLowerCase()
        )
      );

      if (imageFiles.length === 0) {
        return ctx.reply("🚫 هیچ عکسی یافت نشد.");
      }

      imageFiles.forEach((file) => {
        const filePath = path.join(lemonFolderPath, file);
        ctx.replyWithPhoto({ source: filePath });
      });
    });
  };
  bot.hears("لمون", (ctx) => {
    sendAllImages(ctx);
  });
}
{
  const bawariaFolderPath = path.join(__dirname, "assets", "bawaria");
  const sendAllImages = (ctx) => {
    fs.readdir(bawariaFolderPath, (err, files) => {
      if (err) {
        console.error("خطا در خواندن پوشه:", err);
        return ctx.reply("❌ خطایی در خواندن تصاویر رخ داد.");
      }

      const imageFiles = files.filter((file) =>
        [".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(
          path.extname(file).toLowerCase()
        )
      );

      if (imageFiles.length === 0) {
        return ctx.reply("🚫 هیچ عکسی یافت نشد.");
      }

      imageFiles.forEach((file) => {
        const filePath = path.join(bawariaFolderPath, file);
        ctx.replyWithPhoto({ source: filePath });
      });
    });
  };
  bot.hears("باواریا", (ctx) => {
    sendAllImages(ctx);
  });
}
{
  const goldkishFolderPath = path.join(__dirname, "assets", "goldkish");
  const sendAllImages = (ctx) => {
    fs.readdir(goldkishFolderPath, (err, files) => {
      if (err) {
        console.error("خطا در خواندن پوشه:", err);
        return ctx.reply("❌ خطایی در خواندن تصاویر رخ داد.");
      }

      const imageFiles = files.filter((file) =>
        [".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(
          path.extname(file).toLowerCase()
        )
      );

      if (imageFiles.length === 0) {
        return ctx.reply("🚫 هیچ عکسی یافت نشد.");
      }

      imageFiles.forEach((file) => {
        const filePath = path.join(goldkishFolderPath, file);
        ctx.replyWithPhoto({ source: filePath });
      });
    });
  };
  bot.hears("گلدکیش", (ctx) => {
    sendAllImages(ctx);
  });
}
bot.hears("منو اصلی", (ctx) => {
  showMainMenu(ctx);
});
bot.launch();
