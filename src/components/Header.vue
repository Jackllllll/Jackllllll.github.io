<!--
 * @Date: 2021-04-15 16:02:47
 * @Author: zb.lin
 * @Email: lin302010@qq.com
 * @LastEditTime: 2021-04-20 07:18:53
-->
<template>
    <header>
        <el-affix :offset="0">
            <el-row>
                <el-col :span="24">
                    <div class="grid-content bg-purple-dark bg">
                        <ul>
                            <li
                                v-for="item in items"
                                :key="item.id"
                                @click="jump(item.toJumpClassName)"
                            >
                                {{ item.name }}
                            </li>
                        </ul>
                    </div>
                </el-col>
            </el-row>
        </el-affix>
    </header>
</template>

<script>
export default {
    name: "Header",
    props: {
        msg: String,
    },
    data() {
        return {
            items: [
                {
                    name: "个人信息",
                    toJumpClassName: ".SelfIntroduction",
                },
                {
                    name: "自我总结及技能",
                    toJumpClassName: ".about_me",
                },
                {
                    name: "工作经历",
                    toJumpClassName: ".WorkExperience",
                },
                {
                    name: "工作项目及作品",
                    toJumpClassName: ".ProjectsAndWorks",
                },
                {
                    name: "娃身高与体重",
                    toJumpClassName: ".HeightAndWeight",
                },
            ],
        };
    },
    methods: {
        jump(toJumpClassName) {
            if (toJumpClassName === '.HeightAndWeight') {
                this.$router.push({
                    name: 'HeightAndWeight',
                })
            }
            document.querySelector(toJumpClassName).scrollIntoView({
                behavior: "smooth", // 平滑过渡
                block: "start", // 上边框与视窗顶部平齐。默认值
            });
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@media (max-width: 750px) {
    .bg {
        background: rgba($color: #ffffff, $alpha: 0.4);

        li {
            color: #35404e;
            margin: 30px 10px;
            cursor: pointer;
        }
    }
}

@media (min-width: 1200px) {
    .bg {
        background: rgba($color: #ffffff, $alpha: 0.4);
        box-shadow: 0 4px 6px 0 rgba(10, 10, 10, 0.05);

        li {
            color: #35404e;
            margin: 30px 49px;
            cursor: pointer;
        }
    }
}

h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
