$(document).ready(function () {

    $.jsonp({
        url: 'https://www.easyapi.com/team!vie.action?id='+$("#nowTeamId").val(),
        callback:"callback",
        success: function (result) {
            //your code
            if (result.status == '1' || result.status == 1) {
                if (result.status == '1' || result.status == 1) {
                    var _nowTeamImg=result.teamImg;
                    var _nowTeamName=result.teamName;
                    $("#myTeamNowImg").attr('src',_nowTeamImg+'!icon.jpg');
                    $("#myTeamNowName").text(_nowTeamName);
                }
            }
        },
        error: function (xOptions, textStatus) {
            //your code
        }
    });

    $.jsonp({
        url: 'https://www.easyapi.com/user-team!list.action?userTeamQuery.userId='+$("#myUserId").val(),
        callback:"callback",
        success: function (result) {
            //your code
            if (result.status == '1' || result.status == 1) {
                var userTeams = result.userTeams;
                for (var i = 0; i < userTeams.length; i++) {
                    var _teamId = userTeams[i].team.id;
                    var _teamName = userTeams[i].team.name;
                    var _teamImg = userTeams[i].team.img;
                    var _ur = '<a href="https://www.easyapi.com/user!changeTeam.action?teamId='+_teamId+'&redirect=/project/" class="u"><img src="'+_teamImg+'!icon.jpg">&nbsp;&nbsp;'+_teamName+' </a>';
                    //$.get(_ur, function (resu) {
                        $("#userTeamBox").append(_ur);
                    //});
                }
            }
        },
        error: function (xOptions, textStatus) {
            //your code
        }
    });

})


